import { useState } from 'react'

import { Box, Image, Spinner, Center, useDisclosure } from '@chakra-ui/react';
import { GuessStatsHeaderCase } from './GuessStatsHeaderCase';
import { Attribut } from '../../../models/Attribut';
import { Entity } from '../../../models/Entity';
import { EntityService } from '../../../service/EntityService';
import { GuessStatsAttributs } from './attributs/GuessStatsAttributs';
import { GameProvider, useGameContext } from '../contextProvider';
import { RegenerateButton } from '../components/RegenerateButton';
import { AutocompleteDropdown } from '../components/AutocompleteDropdown';
import { SettingsModal } from './settings-modal/GuessStatsSettingsModal';

interface GuessStatsPageProps<T extends Entity> {
  service: EntityService<T>;
  useData: () => T[];
}

export function GuessStatsPage<T extends Entity>({ service, useData }: GuessStatsPageProps<T>) {
  const [attributs, setAttributs] = useState(service.getCurrentSet());

  return <GameProvider useData={useData} service={service} options={{ onRegenerate: () => setAttributs(service.getCurrentSet()) }}>
    <GuessStats<T> service={service} attributs={attributs} />
  </GameProvider>;
}

interface GuessStatsProps<T extends Entity> {
  service: EntityService<T>;
  attributs: Attribut<any, T>[];
}

function GuessStats<T extends Entity>({ service, attributs }: GuessStatsProps<T>) {

  const { allEntitiesData, entityToFind, win, entityGuessTries } = useGameContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <AutocompleteDropdown />
      {(win) &&
        <>
          <Box h="50px"></Box>
          <Image src={entityToFind.sprite} h="200px"></Image>
        </>
      }
      <Box h="50px"></Box>

      <Box>
        <Box className='table-head' display="flex" gap="10px">
          <GuessStatsHeaderCase>{service.getSpriteColumnName()}</GuessStatsHeaderCase>
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

      <SettingsModal service={service} isOpen={isOpen} onClose={onClose} />

    </>
  )
}

