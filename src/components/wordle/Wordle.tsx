import React, { useEffect, useState } from 'react';
import { Keyboard } from '../keyboard/Keyboard';
import { Box } from '@chakra-ui/react';
import Board from '../keyboard/Board';

const Wordle = () => {

  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [currentIndexEditingWord, setCurrentIndexEditingWord] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Touche enfoncée:', event.key);

      if (event.key === 'Enter') {
        console.log('La touche Enter a été enfoncée');
        setCurrentIndexEditingWord(currentIndexEditingWord + 1);
      }
      if (/^[a-zA-Z]$/.test(event.key) && words[currentIndexEditingWord].length < 12) {
        console.log('La touche est une lettre: ', event.key);
        const newWords = [...words];
        newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord] + event.key;
        setWords(newWords);
      }
      if (event.key === 'Backspace') {
        console.log('La touche Backspace a été enfoncée');
        const newWords = [...words];
        newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord].slice(0, -1);
        setWords(newWords);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndexEditingWord, words]); 

  return (
    <Box h="calc(100vh - 70px)" display="flex" flexDir="column">
      <Box flex={1} pt="20px">
        <Board words={words}></Board>
      </Box>
      <Box  pb="50px">
        <Keyboard></Keyboard>
      </Box>
    </Box>
  );
};

export default Wordle;