import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Select, Button, IconButton, Icon, ModalFooter, Divider } from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { PokemonAttribut } from "../../../models/PokemonAttribut";
import { LocalStorageService } from "../../../service/LocalStorageService";
import { Pokeguess } from "../pokeguess/Pokeguess";
import { useDataPokemon } from "../../../context/DataContext";
import { RandomTD } from "../RandomTd";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = (props: SettingsModalProps) => {
  const { isOpen, onClose } = props;
  const pikachu = useDataPokemon().find((pokemon) => pokemon.pokedexId === 25)!;
  const [attributs, setAttributs] = useState(LocalStorageService.getSetName());
  const attributSetToLoadRef = useRef<HTMLSelectElement>(null);
  const attributToAddRef = useRef<HTMLSelectElement>(null);

  const loadSetAttribut = (setName: string) => {
    const setAttributsToLoad = LocalStorageService.getRegisteredSetNames().get(setName);
    if (!setAttributsToLoad) return;
    setAttributs(setAttributsToLoad);
  }

  const addAttribut = (attributId: string) => {
    const attribut = PokemonAttribut.fromId(attributId);
    if (!attribut) return;
    setAttributs([...attributs, attribut]);
  }

  const deleteAttribut = (index: number) => {
    const newAttributs = attributs.filter((_, i) => i !== index);
    setAttributs(newAttributs);
  }

  const save = () => {
    LocalStorageService.saveSetName(attributs);
    close();
  }

  const close = () => {
    onClose();
    setAttributs(LocalStorageService.getSetName());
  }

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent width="auto" minW="20vw" maxW="auto">
        <ModalHeader>Changer les attributs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="grid" gridTemplateColumns="auto 200px auto" gap="10px" alignItems="center" justifyContent="center" mb="40px">
            <Box>Sets d'attributs enregistrés&nbsp;:</Box>
            <Select h="32px" ref={attributSetToLoadRef}>
              {Array.from(LocalStorageService.getRegisteredSetNames().keys()).map((setName, index) => (
                <option key={index} value={setName}>{setName}</option>
              ))}
            </Select>
            <Button onClick={() => loadSetAttribut(attributSetToLoadRef.current?.value ?? "")}>Charger</Button>

            <Box display="flex" justifyContent="center">Paramètre à ajouter&nbsp;:</Box>
            <Select h="32px" ref={attributToAddRef}>
              {PokemonAttribut.values().filter((attribut) => !attributs.includes(attribut)).map((attribut, index) => (
                <option key={index} value={attribut.id}>{attribut.id}</option>
              ))}
            </Select>
            <Button onClick={() => addAttribut(attributToAddRef.current?.value ?? "")}>
              Ajouter
            </Button>
          </Box>
          <Box className='table-head' display="flex" gap="10px">
            <RandomTD></RandomTD>
            {attributs.map((col, colIndex) => (
              <RandomTD key={colIndex} size={col.columns.length}>
                <IconButton aria-label='Close' onClick={() => deleteAttribut(colIndex)} icon={
                  <Icon viewBox="0 0 24 24" boxSize={5}><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></Icon>} />
              </RandomTD>))}
          </Box>
          <Box className='table-head' display="flex" gap="10px">
            <Box display={"flex"}>
              <RandomTD>Pokemon</RandomTD>
            </Box>
            {attributs.flatMap((attribut: PokemonAttribut<any>, index: number) => attribut.columns).map((col, colIndex) => (
              <RandomTD key={colIndex}>{col.label}</RandomTD>
            ))}
          </Box>
          <Box className='table-body' display="flex">
            <Pokeguess key={pikachu.pokedexId} pokemonGuess={pikachu} pokemonToGuess={pikachu} isAnimated={false} attributs={attributs} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={close}>
            Fermer
          </Button>
          <Button colorScheme='blue' onClick={save}>Sauvegarder</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}