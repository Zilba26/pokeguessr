import React, { FC } from 'react'
import { Keypad } from './Keypad';
import { Box, IconButton } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowBackIosNew, MdKeyboardBackspace, MdKeyboardReturn } from 'react-icons/md'

interface KeyboardProps {
  onLetterClick?: (letter: string) => void;
  onBackspaceClick?: () => void;
  onEnterClick?: () => void;
}

export const Keyboard: FC<KeyboardProps> = (props: KeyboardProps) => {
  const letterList = [["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"], ["W", "X", "C", "V", "B", "N"]];

  return (
    <Box display="flex" flexDirection="column" gap="5px">
      {letterList.map((letterRow, index) => {
        return (
          <Box key={index} className='flex-center' gap="5px">
            {index == 2 && <IconButton w="105px" h="50px"
              aria-label='Backspace'
              fontSize="1.5rem"
              onClick={props.onBackspaceClick}
              icon={<MdArrowBackIosNew />}
            />}
            {letterRow.map((letter, index) => {
              return (
                <Box key={index} onClick={props.onLetterClick ? () => props.onLetterClick!(letter) : undefined}>
                  <Keypad letter={letter}></Keypad>
                </Box>
              )
            })}
            {index == 2 && <IconButton w="105px" h="50px"
              aria-label='Enter'
              fontSize="1.7rem"
              onClick={props.onEnterClick}
              icon={<MdKeyboardReturn />}
            />}
          </Box>
        )
      })}
    </Box>
  )
}