import { useEffect, useRef, useState } from 'react';
import { Keyboard } from './keyboard/Keyboard';
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
  const pokemons = useDataPokemon();
  const service = new PokemonService();
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>(service.getRandomPokemon(pokemons));
  const [error, setError] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollableWrapperRef = useRef(null);
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    if (pokemons.length > 0) {
      const pokemonService = new PokemonService();
      const randomPokemon = pokemonService.getRandomPokemon(pokemons);

      setPokemonToGuess(randomPokemon);
    }
  }, [pokemons]);

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
      const enterPokemon = pokemons.find((pokemon) => {
        return pokemon.equalsName(words[currentIndexEditingWord]);
      });
      if (enterPokemon) {
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
  }, [currentIndexEditingWord, words, pokemons]);

  const reset = () => {
    setWords(["", "", "", "", "", ""]);
    setCurrentIndexEditingWord(0);
    setPokemonToGuess(service.getRandomPokemon(pokemons));
    onClose();
  }

  const continueGame = () => {
    setWords([...words, ""]);
    onClose();
  }

  const removeFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  }


  if (pokemons.length === 0 || !pokemonToGuess) {
    return <Center h="100%" minH="inherit">
      <Spinner size="xl" />
    </Center>;
  }

  return (
    <>
      <Box h="var(--height)" minH="inherit" maxH="var(--height)" display="flex" flexDir="column">
        <Box h="20px"></Box>
        <Box className='flex-center'>
          <GenSelect></GenSelect>
          <Box w="10px"></Box>
          <IconButton w={50} h={50} fontSize="20px" aria-label="Recommencer" icon={<MdRefresh/>} onClick={reset} onFocus={removeFocus}></IconButton>
        </Box>
        <Box h="20px"></Box>
        <Box overflowY="auto" ref={scrollableWrapperRef} flex={1}>
          <Box className='flex-center' h="100%">
            <Board words={words} pokemonToGuess={pokemonToGuess} currentIndexEditingWord={currentIndexEditingWord} error={error}></Board>
          </Box>
        </Box>
        <Box h="20px"></Box>
        <Box pb="30px">
          <Keyboard onLetterClick={pressLetter} onBackspaceClick={pressBackspace} onEnterClick={pressEnter}></Keyboard>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Perdu !</ModalHeader>
          <ModalBody>
            Vous avez perdus. Voulez vous quand même continuer ou recommencer ?
          </ModalBody>
          <ModalFooter>
            <Button onClick={reset} mr={3}>Recommencer</Button>
            <Button onClick={continueGame}>Continuer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Wordle;