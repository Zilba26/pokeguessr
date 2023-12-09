import React, { useEffect, useState } from 'react';
import { Keyboard } from './keyboard/Keyboard';
import { Box, Center, Spinner } from '@chakra-ui/react';
import Board from './Board';
import { useDataPokemon } from '../../context/DataContext';
import { PokemonService } from '../../service/PokemonService';
import { Pokemon } from '../../models/Pokemon';

const Wordle = () => {

  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [currentIndexEditingWord, setCurrentIndexEditingWord] = useState<number>(0);
  const pokemons = useDataPokemon();
  const service = new PokemonService();
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>(service.getRandomPokemon(pokemons));
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (pokemons.length > 0) {
      const pokemonService = new PokemonService();
      const randomPokemon = pokemonService.getRandomPokemon(pokemons);

      setPokemonToGuess(randomPokemon);
    }
  }, [pokemons]);

  const pressLetter = (letter: string) => {
    setError(false);
    const newWords = [...words];
    newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord] + letter;
    setWords(newWords);
  }

  const pressBackspace = () => {
    setError(false);
    const newWords = [...words];
    newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord].slice(0, -1);
    setWords(newWords);
  }

  const pressEnter = () => {
    setError(false);
    const enterPokemon = pokemons.find((pokemon) => {
      return pokemon.equalsName(words[currentIndexEditingWord]);
    });
    if (enterPokemon) {
      setCurrentIndexEditingWord(currentIndexEditingWord + 1);
    } else {
      setError(true);
      console.log('Pokemon non trouvé');
    }
  }

  useEffect(() => {
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

  

  if (pokemons.length === 0 || !pokemonToGuess) {
    return <Center h="100%" minH="inherit">
      <Spinner size="xl"/>
    </Center>;
  }

  return (
    <Box minH="inherit" display="flex" flexDir="column">
      <p>{pokemonToGuess.name}</p>
      <Box flex={1} pt="20px">
        <Board words={words} pokemonToGuess={pokemonToGuess} currentIndexEditingWord={currentIndexEditingWord}></Board>
        <Box h="50px" className='flex-center'>
          {error && <Box color="red" pt="16px">Ce pokemon n'existe pas</Box>}
        </Box>
      </Box>
      <Box  pb="50px">
        <Keyboard onLetterClick={pressLetter} onBackspaceClick={pressBackspace} onEnterClick={pressEnter}></Keyboard>
      </Box>
    </Box>
  );
};

export default Wordle;