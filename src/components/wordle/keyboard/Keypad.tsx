import { Button } from '@chakra-ui/react';
import React, { FC } from 'react'

interface KeypadProps {
    letter: string;
    color?: string | null;
}

export const Keypad: FC<KeypadProps> = (props: KeypadProps) => {

    const removeFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        e.target.blur();
    }

    let color;
    if (props.color == "none" || props.color == null) {
        color = "var(--chakra-colors-whiteAlpha-200)"
    } else {
        color = props.color;
    }

    return (
        <Button w="50px" h="50px" bgColor={color} opacity={props.color ? 1 : 0.5} onFocus={removeFocus}>{props.letter}</Button>
    )
}