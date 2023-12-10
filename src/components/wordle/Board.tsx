import React, { FC } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Pokemon } from '../../models/Pokemon';
import WordleSoluce from './WordleSoluce';

interface BoardProps {
  words: string[];
  pokemonToGuess: Pokemon;
  currentIndexEditingWord: number;
  error?: boolean;
}

const Board: FC<BoardProps> = (props: BoardProps) => {

  const maxLetters = 12;

  const borderCaseColor = useColorModeValue("black", "white");

  const getLigneElements = (word: string, index: number) => {
    const elements = [];
    const pokemonToGuessNormalized = props.pokemonToGuess.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const wordNormalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const wordleSoluce = WordleSoluce(wordNormalized, pokemonToGuessNormalized);
    for (let i = 0; i < maxLetters; i++) {
      const element = wordNormalized[i] ?? "";
      let color;
      if (index >= props.currentIndexEditingWord) {
        color = "gray.500";
      } else if (i < wordleSoluce.length) {
        color = wordleSoluce[i];
      } else if (pokemonToGuessNormalized[i] === undefined) {
        color = "red.500";
      } else {
        color = "gray.500";
      }
      elements.push(
        <Box key={element + i} w="50px" h="50px" className='flex-center' fontWeight={props.error && index == props.currentIndexEditingWord ? "bold" : "normal"}
          color={props.error && index == props.currentIndexEditingWord ? "red" : "white"} bgColor={color} border="1px" borderColor={borderCaseColor}>
          {element}
        </Box>
      );
    }
    return elements;
  }

  return (
    <Box className='flex-center' flexDir="column" gap="12px">
      {props.words.map((word, index) => {
        return (
          <Box key={word + index} className='flex-center' gap="7px">
            {getLigneElements(word, index)}
          </Box>
        )
      })}
    </Box>
  )
}

export default Board