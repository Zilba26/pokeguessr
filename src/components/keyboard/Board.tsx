import React, { FC } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

interface BoardProps {
  words: string[];
}

const Board: FC<BoardProps> = (props: BoardProps) => {

  const maxLetters = 12;

  const borderCaseColor = useColorModeValue("black", "white");

  const getLigneElements = (word: string) => {
    const elements = [];
    const upperCaseWord = word.toUpperCase();
    for (let index = 0; index < maxLetters; index++) {
      const element = upperCaseWord[index] ?? "";
      elements.push(
        <Box key={element + index} w="50px" h="50px" className='flex-center' bgColor="gray.400" border="1px" borderColor={borderCaseColor}>
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
            {getLigneElements(word)}
          </Box>
        )
      })}
    </Box>
  )
}

export default Board