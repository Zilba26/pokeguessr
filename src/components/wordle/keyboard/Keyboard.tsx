import { FC } from 'react'
import { Keypad } from './Keypad';
import { Box, IconButton } from '@chakra-ui/react';
import { MdArrowBackIosNew, MdKeyboardReturn } from 'react-icons/md'

export type LettersStatus = "good" | "not good" | "pending" | "bad spot";

interface KeyboardProps {
  onLetterClick?: (letter: string) => void;
  onBackspaceClick?: () => void;
  onEnterClick?: () => void;
  lettersStatus: Map<string, LettersStatus>;
}

export const Keyboard: FC<KeyboardProps> = (props: KeyboardProps) => {
  const letterList = [["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"], ["W", "X", "C", "V", "B", "N"]];

  const getColorByStatus = (letter: string) => {
    const status = props.lettersStatus.get(letter);
    switch (status) {
      case "good":
        return "red.500 !important";
      case "bad spot":
        return "yellow.500 !important";
      case "pending":
        return "none";
      case "not good":
        return null;
    }
  }

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
                  <Keypad letter={letter} color={getColorByStatus(letter)}></Keypad>
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