import { Box, Button } from '@chakra-ui/react';
import React, { FC } from 'react'

export type KeypadStatus = "default" | "red" | "orange" | "disabled";

interface KeypadProps {
    letter: string;
    status?: KeypadStatus;
}

export const Keypad: FC<KeypadProps> = (props: KeypadProps) => {

    const removeFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        e.target.blur();
    }


    return (
        <Button w="50px" h="50px" onFocus={removeFocus}>{props.letter}</Button>
    )
}