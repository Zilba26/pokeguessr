import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Button, IconButton, Icon, ModalFooter, useToast, SystemStyleObject } from "@chakra-ui/react";
import { ActionMeta, Select } from "chakra-react-select";
import { useState } from "react";
import { GuessStatsHeaderCase } from "../GuessStatsHeaderCase";
import { GuessStatsAttributs } from "../attributs/GuessStatsAttributs";
import { Entity } from "../../../models/Entity";
import { Option } from "./Option";
import { CustomOption } from "./CustomOptionSelect";
import { Attribut } from "../../../models/Attribut";
import { EntityService } from "../../../service/EntityService";

interface SettingsModalProps<T extends Entity> {
  service: EntityService<T>;
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = <T extends Entity>(props: SettingsModalProps<T>) => {
  const { isOpen, onClose, service } = props;
  const entity = service.getBaseEntity()!;
  const [attributsSetsNames, setAttributsSetsNames] = useState<Map<string, Attribut<any, T>[]>>(service.getRegisteredSets());
  const [attributs, setAttributs] = useState(service.getCurrentSet());
  const [attributSetToLoad, setAttributSetToLoad] = useState<Option | null>(null);
  const [attributToAdd, setAttributToAdd] = useState<Option | null>(null);
  const toast = useToast();

  const loadSetAttribut = (setName: string) => {
    const setAttributsToLoad = service.getRegisteredSets().get(setName);
    if (!setAttributsToLoad) return;
    setAttributs(setAttributsToLoad);
  }

  const addAttribut = (attributId: string) => {
    const attribut = service.getAttributFromId(attributId);
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
    if (service.saveSetWithName(setName, attributs)) {
      setAttributsSetsNames(service.getRegisteredSets());
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
    service.deleteRegisteredSet(setName);
    setAttributsSetsNames(service.getRegisteredSets());
    if (attributSetToLoad?.value === setName) {
      setAttributSetToLoad(null);
    }
  }

  const save = () => {
    service.saveCurrentSet(attributs);
    close();
    toast({
      title: "Les attributs ont été sauvegardés et seront chargés pour le prochain pokemon !",
      status: "success",
    });
  }

  const close = () => {
    onClose();
    setAttributs(service.getCurrentSet());
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
            <Select<Option> value={attributToAdd} onChange={setAttributToAdd} options={service.getAllAttributs().filter((attribut) => !attributs.includes(attribut)).map((attribut, index) => (
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
            <GuessStatsHeaderCase></GuessStatsHeaderCase>
            {attributs.map((col, colIndex) => (
              <GuessStatsHeaderCase key={colIndex} size={col.columns.length}>
                <IconButton aria-label='Close' onClick={() => deleteAttribut(colIndex)} icon={
                  <Icon viewBox="0 0 24 24" boxSize={5}><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></Icon>} />
              </GuessStatsHeaderCase>))}
          </Box>
          <Box className='table-head' display="flex" gap="10px">
            <Box display={"flex"}>
              <GuessStatsHeaderCase>Pokemon</GuessStatsHeaderCase>
            </Box>
            {attributs.flatMap((attribut: Attribut<any, T>, index: number) => attribut.columns).map((col, colIndex) => (
              <GuessStatsHeaderCase key={colIndex}>{col.label}</GuessStatsHeaderCase>
            ))}
          </Box>
          <Box className='table-body' display="flex">
            <GuessStatsAttributs key={entity.id} entityGuess={entity} entityToGuess={entity} isAnimated={false} attributs={attributs} />
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