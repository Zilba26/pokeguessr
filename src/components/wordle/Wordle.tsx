import { useEffect, useRef, useState } from 'react';
import { Keyboard, LettersStatus } from './keyboard/Keyboard';
import { Box, Button, Center, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import Board from './Board';
import { useDataPokemon } from '../../context/DataContext';
import { PokemonService } from '../../service/PokemonService';
import { Pokemon } from '../../models/Pokemon';
import GenSelect from '../gen-select/GenSelect';
import { MdRefresh } from 'react-icons/md';

const Wordle = () => {

  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [currentIndexEditingWord, setCurrentIndexEditingWord] = useState<number>(0);
  const pokemonsData = useDataPokemon();
  const genSelectedLocal = localStorage.getItem("genSelected");
  const [genSelected, setGenSelected] = useState<boolean[]>(
    genSelectedLocal ? JSON.parse(genSelectedLocal) : [true, true, true, true, true, true, true, true, true]);
  const service = new PokemonService();
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>();
  const [error, setError] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollableWrapperRef = useRef(null);
  const [win, setWin] = useState<boolean>(false);

  const alphabetMap: Map<string, LettersStatus> = new Map();
  for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);  // 'A' a le code ASCII 65
      alphabetMap.set(letter, "pending");
  }

  const [lettersStatus, setLettersStatus] = useState<Map<string, LettersStatus>>(alphabetMap);

  useEffect(() => {
    if (pokemonsData.length > 0) {
      const pokemons = pokemonsData.filter((pokemon: Pokemon) => genSelected[pokemon.generation - 1])
      setPokemons(pokemons);

      const pokemonService = new PokemonService();
      const randomPokemon = pokemonService.getRandomPokemon(pokemons);
      setPokemonToGuess(randomPokemon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsData]);

  const pressLetter = (letter: string) => {
    if (!win) {
      setError(false);
      const newWords = [...words];
      newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord] + letter;
      setWords(newWords);
    }
  }

  const pressBackspace = () => {
    if (!win) {
      setError(false);
      const newWords = [...words];
      newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord].slice(0, -1);
      setWords(newWords);
    }
  }

  const pressEnter = () => {
    if (!win) {
      setError(false);
      const enterPokemon = pokemons!.find((pokemon) => {
        return pokemon.equalsName(words[currentIndexEditingWord]);
      });
      if (enterPokemon) {
        updateLettersStatus();
        if (enterPokemon.equals(pokemonToGuess!)) {
          setWin(true);
          onOpen();
          return;
        }
        setCurrentIndexEditingWord(currentIndexEditingWord + 1);
        if (currentIndexEditingWord === 5) {
          onOpen();
        }
        if (currentIndexEditingWord > 5) {
          setWords([...words, ""]);
        }
      } else {
        setError(true);
      }
    }
  }

  const updateLettersStatus = () => {
    const word = words[currentIndexEditingWord].toUpperCase();
    const pokemonName = pokemonToGuess!.name.toUpperCase();
    for (let i = 0; i < word.length; i++) {
      const letter = word.charAt(i);
      if (pokemonName.charAt(i) === letter) {
        lettersStatus.set(letter, "good");
      } else if (pokemonName.includes(letter) && lettersStatus.get(letter) !== "good") {
        lettersStatus.set(letter, "bad spot");
      } else {
        lettersStatus.set(letter, "not good");
      }
    }
    setLettersStatus(new Map(lettersStatus));
  }

  useEffect(() => {

    if (scrollableWrapperRef.current) {
      const scrollElement = scrollableWrapperRef.current as HTMLElement;
      scrollElement.scrollTo(0, scrollElement.scrollHeight);
    }

    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Enter') {
        pressEnter();
      }
      if (/^[a-zA-Z]$/.test(event.key) && words[currentIndexEditingWord].length < 12) {
        pressLetter(event.key.toUpperCase());
      }
      if (event.key === 'Backspace') {
        pressBackspace();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndexEditingWord, words, pokemons, win]);

  const reset = () => {
    setWords(["", "", "", "", "", ""]);
    setCurrentIndexEditingWord(0);
    const pokemons = pokemonsData.filter((pokemon: Pokemon) => genSelected[pokemon.generation - 1]);
    setPokemons(pokemons);
    setPokemonToGuess(service.getRandomPokemon(pokemons));
    setLettersStatus(new Map(alphabetMap));
    setWin(false);
    onClose();
  }

  const continueGame = () => {
    setWords([...words, ""]);
    onClose();
  }

  const removeFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  }


  if (!pokemons || pokemons.length === 0 || !pokemonToGuess) {
    return <Center h="100%" minH="inherit">
      <Spinner size="xl" />
    </Center>;
  }

  return (
    <>
      <Box h="var(--height)" minH="inherit" maxH="var(--height)" display="flex" flexDir="column">
        <Box h="20px"></Box>
        <Box className='flex-center'>
          <GenSelect triggerChange={setGenSelected}></GenSelect>
          <Box w="10px"></Box>
          <IconButton w={50} h={50} fontSize="20px" aria-label="Recommencer" icon={<MdRefresh/>} onClick={reset} onFocus={removeFocus}></IconButton>
        </Box>
        <Box h="20px"></Box>
        <Box overflowY="auto" ref={scrollableWrapperRef} flex={1}>
          <Box className='flex-center'>
            <Board words={words} pokemonToGuess={pokemonToGuess} currentIndexEditingWord={currentIndexEditingWord} error={error}></Board>
          </Box>
        </Box>
        <Box h="20px"></Box>
        <Box pb="30px">
          <Keyboard lettersStatus={lettersStatus} onLetterClick={pressLetter} onBackspaceClick={pressBackspace} onEnterClick={pressEnter}></Keyboard>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{win ? "Gagné !" : "Perdu !"}</ModalHeader>
          <ModalBody>
            {win 
            ? "Vous avez gagnés. Voulez vous recommencer ?"
            : "Vous avez perdus. Voulez vous quand même continuer ou recommencer ?"}
          </ModalBody>
          <ModalFooter>
            <Button onClick={win ? onClose : reset} mr={3}>{win ? "Fermer" : "Recommencer"}</Button>
            <Button onClick={win ? reset : continueGame}>{win ? "Recommencer" : "Continuer"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Wordle;