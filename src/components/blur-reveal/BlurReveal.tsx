import React, { useEffect, useState } from 'react'

import '../guess-stats/GuessStats.scss'
import { Box, Button, Input, useColorModeValue, Image, Spinner, Center, useToast, useDisclosure, Text } from '@chakra-ui/react';
import { Entity } from '../../models/Entity';
import { EntityService } from '../../service/EntityService';
import { normalizeString } from '../../utils/normalize';



interface BlurRevealProps<T extends Entity> {
    useData: () => T[];
    service: EntityService<T>;
}

export function BlurReveal<T extends Entity>({ useData, service }: BlurRevealProps<T>) {

    // Toutes les entités disponibles (avant filtre(s))
    const allEntitiesData: T[] = useData();
    // Entités après application des filtres
    const [entitiesData, setEntitiesData] = useState<T[]>(allEntitiesData.filter((entity: T) => service.getFilterController()?.filter(entity) ?? true));
    // Entité à deviner
    const [entityToFind, setEntityToFind] = useState<T>(service.getRandom(entitiesData));
    const [blurLevel, setBlurLevel] = useState<number>(30);

    // Entités déjà proposées
    const [entityGuessTries, setEntityGuessTries] = useState<T[]>([]);
    // Entités à afficher dans le select/dropdown
    const [dropdownEntities, setDropdownEntities] = useState<T[] | null>(null);
    // Entité sélectionnée dans le select/dropdown
    const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

    const [win, setWin] = useState<boolean>(false);

    const toast = useToast();

    const updateEntitiesData = () => {
        setEntitiesData(allEntitiesData.filter((entity: T) => service.getFilterController()?.filter(entity) ?? true));
    }

    useEffect(() => {
        if (allEntitiesData.length > 0) {
            updateEntitiesData();
            const randomEntity = service.getRandom(entitiesData);

            setEntityToFind(randomEntity);
        }
    }, [allEntitiesData]);

    const enterEntity = (entityInput?: T) => {
        if (entityInput == undefined) {
            const input = document.querySelector<HTMLInputElement>('input');
            if (input) {
                const entityName = normalizeString(input.value);
                const entity = entitiesData.find((entity: T) => {
                    return normalizeString(entity.name) === entityName;
                });
                if (entity) {
                    entityInput = entity;
                }
            }
        }
        if (entityInput && !entityGuessTries.includes(entityInput)) {
            setEntityGuessTries([...entityGuessTries, entityInput]);
            setDropdownEntities(null);
            setBlurLevel(blurLevel - 3);
            const input = document.querySelector<HTMLInputElement>('input');
            input!.value = '';
            input!.focus();
        }
        if (entityInput && entityInput.equals(entityToFind)) {
            setWin(true);
            setBlurLevel(0);
            const pyro = document.getElementById('pyro');
            pyro?.classList.add('pyro');
            setTimeout(() => {
                pyro?.classList.remove('pyro');
            }, 10000);
        }
    }

    const onGuessInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = normalizeString(event.target.value);
        let list;
        const minLengthToSearch = entitiesData.length > 500 ? 3 : 2;
        if (value.length >= minLengthToSearch) {
            list = entitiesData.filter((entity: T) => {
                return normalizeString(entity.name).split(" ").some(part => part.startsWith(value)) && !entityGuessTries.includes(entity);
            });
        } else {
            list = null;
        }
        setSelectedEntity(list?.[0] ?? null);
        setDropdownEntities(list);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (selectedEntity) {
            if (event.key === 'Enter') {
                enterEntity(selectedEntity);
            } else if (event.key === 'ArrowDown') {
                const index = dropdownEntities?.indexOf(selectedEntity);
                if (index != undefined && index < dropdownEntities!.length - 1) {
                    setSelectedEntity(dropdownEntities![index + 1]);
                }
            } else if (event.key === 'ArrowUp') {
                const index = dropdownEntities?.indexOf(selectedEntity);
                if (index != undefined && index > 0) {
                    setSelectedEntity(dropdownEntities![index - 1]);
                }
            }
        }
    }

    const regenerateEntity = async () => {
        updateEntitiesData();
        const entityToGuess = service.getRandom(entitiesData);
        setEntityToFind(entityToGuess);
        setEntityGuessTries([]);
        setWin(false);
        setBlurLevel(30);
        toast({
            title: `Le ${service.getSpriteColumnName()} a été regénéré !`,
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
        });
    }

    const border = useColorModeValue('black', 'white');
    const bg = useColorModeValue('whiteal', 'gray.700');
    const hoverBg = useColorModeValue('gray.100', 'gray.600');

    if (allEntitiesData.length === 0 || !entityToFind) {
        return <Center h="100%" minH="inherit">
            <Spinner size="xl" />
        </Center>;
    }

    return (
        <>
            <div id="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>
            <div className='random'>
                {service.getFilterController()?.render?.()}
                <Box h="20px"></Box>
                <Box display="flex" gap="10px">
                    <Button onClick={regenerateEntity}>Regénérer</Button>
                </Box>
                <Box h="30px"></Box>
                <Image src={entityToFind.sprite} h="200px" filter={`blur(${blurLevel}px)`}></Image>
                <Box h="50px"></Box>
                <div className='guess'>
                    <div className='dropdown'>
                        <Input id='guess-input' onChange={onGuessInputChange} onKeyDown={handleKeyDown} disabled={win} />
                        <Box id='poke-list' borderColor={border} border="1px" bg={bg} display={dropdownEntities == null ? "none" : "block"} zIndex="100">
                            {dropdownEntities?.length != 0 ? dropdownEntities?.map((entity: T) => {
                                return <Box className='poke-list-item' key={entity.id} bg={entity == selectedEntity ? hoverBg : bg}
                                    _hover={{ bg: hoverBg }} onClick={() => enterEntity(entity)}>
                                    <Box mr="10px">
                                        <img src={entity.sprite} alt={entity.name} />
                                    </Box>
                                    <p>{entity.name}</p>
                                </Box>
                            }) : <Box padding="4px">Aucun résultat</Box>}
                        </Box>
                    </div>
                    <Button onClick={() => enterEntity()}>Enter</Button>
                </div>            

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
            </div>
        </>
    )
}

