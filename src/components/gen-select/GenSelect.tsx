import React, { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { GenSelectBox } from './GenSelectBox'

interface GenSelectProps {
  triggerChange? : (genSelected: boolean[]) => void;
}

const GenSelect: FC<GenSelectProps> = (props: GenSelectProps) => {

  const genSelectedLocal = localStorage.getItem("genSelected");

  const [genSelected, setGenSelected] = useState<boolean[]>(
    genSelectedLocal ? JSON.parse(genSelectedLocal) : [true, true, true, true, true, true, true, true, true]);

  const toggleGenSelected = (index: number) => {
    const genSelectedCopy = [...genSelected];
    if (genSelectedCopy.filter((gen: boolean) => gen).length === 1 && genSelectedCopy[index]) {
      return;
    }
    genSelectedCopy[index] = !genSelectedCopy[index];
    setGenSelected(genSelectedCopy);
    localStorage.setItem("genSelected", JSON.stringify(genSelectedCopy));
    if (props.triggerChange) {
      props.triggerChange(genSelectedCopy);
    }
  }

  return (
    <Box className="flex-center" gap="10px">
        <GenSelectBox gen={1} selected={genSelected[0]} onClick={() => toggleGenSelected(0)}></GenSelectBox>
        <GenSelectBox gen={2} selected={genSelected[1]} onClick={() => toggleGenSelected(1)}></GenSelectBox>
        <GenSelectBox gen={3} selected={genSelected[2]} onClick={() => toggleGenSelected(2)}></GenSelectBox>
        <GenSelectBox gen={4} selected={genSelected[3]} onClick={() => toggleGenSelected(3)}></GenSelectBox>
        <GenSelectBox gen={5} selected={genSelected[4]} onClick={() => toggleGenSelected(4)}></GenSelectBox>
        <GenSelectBox gen={6} selected={genSelected[5]} onClick={() => toggleGenSelected(5)}></GenSelectBox>
        <GenSelectBox gen={7} selected={genSelected[6]} onClick={() => toggleGenSelected(6)}></GenSelectBox>
        <GenSelectBox gen={8} selected={genSelected[7]} onClick={() => toggleGenSelected(7)}></GenSelectBox>
        <GenSelectBox gen={9} selected={genSelected[8]} onClick={() => toggleGenSelected(8)}></GenSelectBox>
      </Box>
  )
}

export default GenSelect