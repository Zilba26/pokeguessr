import React, { useEffect, useState } from 'react'

import './GuessStats.scss'
import { Box, Button, Input, useColorModeValue, Image, Spinner, Center, useToast, useDisclosure } from '@chakra-ui/react';
import { SettingsModal } from './settings-modal/SettingsModal';
import { GuessStatsHeaderCase } from './GuessStatsHeaderCase';
import { Attribut } from '../../models/Attribut';
import { Entity } from '../../models/Entity';
import { EntityService } from '../../service/EntityService';
import { GuessStatsAttributs } from './attributs/GuessStatsAttributs';

export interface EntityFilterController<T extends Entity> {
  filter(entity: T): boolean;
  render?: () => React.ReactNode;
}

interface GuessStatsProps<T extends Entity> {
  useData: () => T[];
  service: EntityService<T>;
  getSetName: () => Attribut<any, T>[];
  filterController?: EntityFilterController<T>;
}

export function GuessStats<T extends Entity>({ useData, service, getSetName, filterController }: GuessStatsProps<T>) {

  // Toutes les entités disponibles (avant filtre(s))
  const allEntitiesData: T[] = useData();
  // Entités après application des filtres
  const [entitiesData, setEntitiesData] = useState<T[]>(allEntitiesData.filter((entity: T) => filterController?.filter(entity) ?? true));
  // Entité à deviner
  const [entityToFind, setEntityToFind] = useState<T>(service.getRandom(entitiesData));

  // Entités déjà proposées
  const [entityGuessTries, setEntityGuessTries] = useState<T[]>([]);
  // Entités à afficher dans le select/dropdown
  const [dropdownEntities, setDropdownEntities] = useState<T[] | null>(null);
  // Entité sélectionnée dans le select/dropdown
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

  const [win, setWin] = useState<boolean>(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [attributs, setAttributs] = useState(getSetName());

  const updateEntitiesData = () => {
    setEntitiesData(allEntitiesData.filter((entity: T) => filterController?.filter(entity) ?? true));
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
        const entityName = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const entity = entitiesData.find((entity: T) => {
          return entity.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === entityName;
        });
        if (entity) {
          entityInput = entity;
        }
      }
    }
    if (entityInput && !entityGuessTries.includes(entityInput)) {
      setEntityGuessTries([...entityGuessTries, entityInput]);
      setDropdownEntities(null);
      const input = document.querySelector<HTMLInputElement>('input');
      input!.value = '';
      input!.focus();
    }
    if (entityInput && entityInput == entityToFind) {
      setWin(true);
      const pyro = document.getElementById('pyro');
      pyro?.classList.add('pyro');
      setTimeout(() => {
        pyro?.classList.remove('pyro');
      }, 10000);
    }
  }

  const onGuessInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    let list;
    if (value.length > 2) {
      list = entitiesData.filter((entity: T) => {
        return entity.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().startsWith(value) && !entityGuessTries.includes(entity);
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
    setAttributs(getSetName());
    toast({
      title: "Le pokémon a été regénéré !",
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
        {filterController?.render?.()}
        <Box h="20px"></Box>
        <Box display="flex" gap="10px">
          <Button onClick={regenerateEntity}>Regénérer</Button>
          <Button onClick={onOpen}>⚙️</Button>
        </Box>
        <Box h="30px"></Box>
        <div className='guess'>
          <div className='dropdown'>
            <Input id='guess-input' onChange={onGuessInputChange} onKeyDown={handleKeyDown} />
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

        {(win) &&
          <>
            <Box h="50px"></Box>
            <Image src={entityToFind.sprite} h="200px"></Image>
          </>
        }

        <Box h="50px"></Box>

        <Box>
          <Box className='table-head' display="flex" gap="10px">
            <GuessStatsHeaderCase>Entity</GuessStatsHeaderCase>
            {attributs.flatMap((attribut: Attribut<any, T>, index: number) => attribut.columns).map((col, colIndex) => (
              <GuessStatsHeaderCase key={`${colIndex}`}>{col.label}</GuessStatsHeaderCase>
            ))}
          </Box>
          <Box className='table-body' display="flex" flexDir="column-reverse">
            {entityGuessTries.map((entity: T) => {
              return <GuessStatsAttributs key={entity.id} attributs={attributs} entityGuess={entity} entityToGuess={entityToFind} />
            })}
          </Box>
        </Box>
      </div>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

