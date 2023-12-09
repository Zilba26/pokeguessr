import React, { FC } from 'react'
import { Keypad } from './Keypad';
import { Box } from '@chakra-ui/react';

interface KeyboardProps {
}

export const Keyboard: FC<KeyboardProps> = (props: KeyboardProps) => {
  const letterList = [["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"], ["W", "X", "C", "V", "B", "N"]];

  return (
    <Box display="flex" flexDirection="column" gap="5px">
      {letterList.map((letterRow, index) => {
        return (
          <Box key={index} className='flex-center' gap="5px">
            {letterRow.map((letter, index) => {
              return (
                <Keypad key={index} letter={letter}></Keypad>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}