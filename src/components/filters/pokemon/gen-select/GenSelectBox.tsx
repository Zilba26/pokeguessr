import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface GenSelectBoxProps {
    gen: number;
    selected: boolean;
    onClick: () => void;
}

export const GenSelectBox: FC<GenSelectBoxProps> = (props: GenSelectBoxProps) => {
  return (
    <Box bg={props.selected ? "green" : "red"} w="50px" h="50px" onClick={props.onClick} cursor="pointer"
        display="flex" justifyContent="center" alignItems="center" borderRadius="8px">
        <Text color="white">{props.gen}</Text>
    </Box>
  )
}