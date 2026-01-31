import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Button, IconButton, Icon, ModalFooter, useToast, SystemStyleObject } from "@chakra-ui/react";
import { ActionMeta, chakraComponents, OptionProps, Select } from "chakra-react-select";
import { FC, useEffect, useState } from "react";
import { PokemonAttribut } from "../../../models/PokemonAttribut";
import { LocalStorageService } from "../../../service/LocalStorageService";
import { Pokeguess } from "../pokeguess/Pokeguess";
import { useDataPokemon } from "../../../context/DataContext";
import { RandomTD } from "../RandomTd";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

type Option = {
  label: string;
  value: string;
}

const CustomOption = (props: OptionProps<Option>) => {
  const { data, innerProps, selectProps, isFocused } = props;

  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!selectProps.menuIsOpen) {
      setConfirming(false);
    }
  }, [selectProps.menuIsOpen]);

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    selectProps.onChange!(data, {
      action: 'remove-value',
      removedValue: data,
    });
    setConfirming(false);
  };

  const handleStartConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setConfirming(true);
  };

  return (
    <chakraComponents.Option {...props}>
      <Box display="flex" alignItems="center" width="100%" gap={2}>
        <Box flex="1" whiteSpace="nowrap">
          {data.label}
        </Box>

        {confirming ? (
          <>
            <IconButton aria-label="Confirm delete" size="sm" bgColor="rgba(255, 0, 0, 0.8)" onClick={handleConfirm} icon={<FaCheck size="20"/>}/>
          </>
        ) : (
          <IconButton aria-label="Delete" size="sm" onClick={handleStartConfirm}
            icon={
              <RxCross2 size="32" />
            }
          />
        )}

      </Box>
    </chakraComponents.Option>
  );
};


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = (props: SettingsModalProps) => {
  const { isOpen, onClose } = props;
  const pikachu = useDataPokemon().find((pokemon) => pokemon.pokedexId === 25)!;
  const [attributsSetsNames, setAttributsSetsNames] = useState<Map<string, PokemonAttribut<any>[]>>(LocalStorageService.getRegisteredSetNames());
  const [attributs, setAttributs] = useState(LocalStorageService.getSetName());
  const [attributSetToLoad, setAttributSetToLoad] = useState<Option | null>(null);
  const [attributToAdd, setAttributToAdd] = useState<Option | null>(null);
  const toast = useToast();

  const loadSetAttribut = (setName: string) => {
    const setAttributsToLoad = LocalStorageService.getRegisteredSetNames().get(setName);
    if (!setAttributsToLoad) return;
    setAttributs(setAttributsToLoad);
  }

  const addAttribut = (attributId: string) => {
    const attribut = PokemonAttribut.fromId(attributId);
    if (!attribut) return;
    setAttributs([...attributs, attribut]);
    setAttributToAdd(null);
  }

  const deleteAttribut = (index: number) => {
    const newAttributs = attributs.filter((_, i) => i !== index);
    setAttributs(newAttributs);
  }

  const saveSet = () => {
    const setName = prompt("Entrez le nom du set d'attributs à sauvegarder :");
    if (!setName) return;
    if (setName.length > 50) {
      toast({
        title: "Le nom du set d'attributs est trop long (50 caractères maximum) !",
        status: "error",
      });
      return;
    }
    if (LocalStorageService.saveSetNameWithName(setName, attributs)) {
      setAttributsSetsNames(LocalStorageService.getRegisteredSetNames());
      toast({
        title: `Le set d'attributs "${setName}" a été sauvegardé !`,
        status: "success",
      });
    } else {
      toast({
        title: `Le set d'attributs "${setName}" existe déjà !`,
        status: "error",
      });
    }
  }

  const deleteSet = (setName: string) => {
    LocalStorageService.deleteSetName(setName);
    setAttributsSetsNames(LocalStorageService.getRegisteredSetNames());
    if (attributSetToLoad?.value === setName) {
      setAttributSetToLoad(null);
    }
  }

  const save = () => {
    LocalStorageService.saveSetName(attributs);
    close();
    toast({
      title: "Les attributs ont été sauvegardés et seront chargés pour le prochain pokemon !",
      status: "success",
    });
  }

  const close = () => {
    onClose();
    setAttributs(LocalStorageService.getSetName());
  }

  const menuStyle = {
    menu: (provided: SystemStyleObject) => ({
      ...provided,
      width: "auto",
      minWidth: "100%"
    }),
  };

  const onChangeOptionSelect = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    switch (actionMeta.action) {
      case 'select-option':
        setAttributSetToLoad(option);
        break;
      case 'remove-value':
        deleteSet(actionMeta.removedValue.value);
        break;
      case 'clear':
        setAttributSetToLoad(null);
        break;
      default:
        console.log(`Action non gérée : ${actionMeta.action}`);
        break;
    }
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
            <Select<Option, false> value={attributSetToLoad} onChange={onChangeOptionSelect} chakraStyles={menuStyle} components={{ Option: CustomOption }} options={
              Array.from(attributsSetsNames.keys()).map((setName, _) => (
                {
                  label: setName,
                  value: setName
                }
              ))} />
            <Button onClick={() => loadSetAttribut(attributSetToLoad?.value ?? "")}>Charger</Button>

            <Box display="flex" justifyContent="center">Paramètre à ajouter&nbsp;:</Box>
            <Select<Option> value={attributToAdd} onChange={setAttributToAdd} options={PokemonAttribut.values().filter((attribut) => !attributs.includes(attribut)).map((attribut, index) => (
              {
                label: attribut.id,
                value: attribut.id
              }
            ))} />
            <Button onClick={() => addAttribut(attributToAdd?.value ?? "")}>
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
        <ModalFooter display="flex" gap="10px">
          <Button variant="ghost" mr={3} onClick={close}>Fermer</Button>
          <Button colorScheme='blue' onClick={saveSet}>Sauvegarder le set</Button>
          <Button colorScheme='blue' onClick={save}>Enregistrer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}