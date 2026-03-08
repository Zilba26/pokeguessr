import { useState } from 'react'

import { Box, useColorModeValue, Image, Spinner, Center, Text, useDisclosure } from '@chakra-ui/react';
import { Entity } from '../../../models/Entity';
import { EntityService } from '../../../service/EntityService';
import { RegenerateButton } from '../components/RegenerateButton';
import { AutocompleteDropdown } from '../components/AutocompleteDropdown';
import { GameProvider, useGameContext } from '../contextProvider';
import { BlurRevealSettingsModal } from './BlurRevealSettingsModal';

interface BlurRevealPageProps<T extends Entity> {
    service: EntityService<T>;
    useData: () => T[];
}

export function BlurRevealPage<T extends Entity>({ service, useData }: BlurRevealPageProps<T>) {
    const [blurLevel, setBlurLevel] = useState<number>(service.getBlurAmount());

    const options = {
        onRegenerate: () => setBlurLevel(service.getBlurAmount()),
        onEnterGuess: () => setBlurLevel((prev) => Math.max(prev - service.getBlurDecrementation(), 0)),
        onWin: () => setBlurLevel(0),
    }

    return <GameProvider useData={useData} service={service} options={options}>
        <BlurReveal<T> service={service} blurLevel={blurLevel} />
    </GameProvider>;
}

interface BlurRevealProps<T extends Entity> {
    service: EntityService<T>;
    blurLevel: number;
}

function BlurReveal<T extends Entity>({ service, blurLevel }: BlurRevealProps<T>) {

    const { allEntitiesData, entityToFind, entityGuessTries } = useGameContext();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const border = useColorModeValue('black', 'white');
    const bg = useColorModeValue('whiteal', 'gray.700');

    if (allEntitiesData.length === 0 || !entityToFind) {
        return <Center h="100%" minH="inherit">
            <Spinner size="xl" />
        </Center>;
    }

    return (
        <>
            {service.getFilterController()?.render?.()}
            <Box h="20px"></Box>
            <RegenerateButton onOpenSettings={onOpen} />
            <Box h="30px"></Box>
            <Image src={entityToFind.sprite} h="200px" filter={`blur(${blurLevel}px)`} draggable={false}></Image>
            <Box h="50px"></Box>
            <AutocompleteDropdown />
            <Box h="50px"></Box>
            <Box>
                <Box className='table-body' display="flex" flexDir="column-reverse" gap="10px">
                    {entityGuessTries.map((entity: T) => {
                        return <Box key={entity.id} w="280px" display="flex" alignItems="center" gap="10px" borderColor={border} border="2px" bg={bg} padding="8px" borderRadius="8px">
                            <Image src={entity.sprite} h="60px" display="inline-block" />
                            <Text fontWeight="bold" fontSize="2xl">{entity.name.toUpperCase()}</Text>
                        </Box>
                    })}
                </Box>
            </Box>
            <BlurRevealSettingsModal service={service} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

