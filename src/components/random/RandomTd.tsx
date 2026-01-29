import { Box } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

interface RandomTDProps extends PropsWithChildren {
  size?: number
}

export const RandomTD: FC<RandomTDProps> = (props: RandomTDProps) => {
  const size = props.size ?? 1;
  const width = `${110 * size + 10 * (size - 1)}px`;
  return (
    <Box w={width} h="50px" border="0px" borderColor="white" display="flex" justifyContent="center" alignItems="center" textAlign="center">
      {props.children}
    </Box>
  )
}