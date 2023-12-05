import React, { useState } from 'react';
import { Keyboard } from '../keyboard/Keyboard';
import { Box } from '@chakra-ui/react';

const Wordle = () => {
  return (
    <Box h="100%">
      <h1>Wordle</h1>
      <Keyboard></Keyboard>
    </Box>
  );
};

export default Wordle;