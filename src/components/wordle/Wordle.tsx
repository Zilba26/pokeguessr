import { useEffect, useRef, useState } from 'react';
import { Keyboard, LettersStatus } from './keyboard/Keyboard';
import { Box, Button, Center, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import Board from './Board';
import { MdRefresh } from 'react-icons/md';
import { Entity } from '../../models/Entity';
import { EntityService } from '../../service/EntityService';

interface WordleProps<T extends Entity> {
  useData: () => T[];
  service: EntityService<T>;
}

export function Wordle<T extends Entity>({ useData, service }: WordleProps<T>) {

  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [currentIndexEditingWord, setCurrentIndexEditingWord] = useState<number>(0);
  const allEntitiesData = useData();
  // const genSelectedLocal = localStorage.getItem("genSelected");
  // const [genSelected, setGenSelected] = useState<boolean[]>(
  //   genSelectedLocal ? JSON.parse(genSelectedLocal) : [true, true, true, true, true, true, true, true, true]);
  const [entitiesData, setEntitiesData] = useState<T[]>();
  const [entityToGuess, setEntityToGuess] = useState<T>();
  const [error, setError] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollableWrapperRef = useRef(null);
  const [win, setWin] = useState<boolean>(false);

  const alphabetMap: Map<string, LettersStatus> = new Map();
  for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);  // 'A' a le code ASCII 65
      alphabetMap.set(letter, "pending");
  }

  const [lettersStatus, setLettersStatus] = useState<Map<string, LettersStatus>>(alphabetMap);

  useEffect(() => {
    if (allEntitiesData.length > 0) {
      const entities = allEntitiesData.filter((entity: T) => true /*genSelected[pokemon.generation - 1]*/);
      setEntitiesData(entities);

      const randomEntity = service.getRandom(entities);
      setEntityToGuess(randomEntity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEntitiesData]);

  const pressLetter = (letter: string) => {
    if (!win) {
      setError(false);
      const newWords = [...words];
      newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord] + letter;
      setWords(newWords);
    }
  }

  const pressBackspace = () => {
    if (!win) {
      setError(false);
      const newWords = [...words];
      newWords[currentIndexEditingWord] = newWords[currentIndexEditingWord].slice(0, -1);
      setWords(newWords);
    }
  }

  const pressEnter = () => {
    if (!win) {
      setError(false);
      const enterEntity = entitiesData!.find((entity) => {
        return entity.equalsName(words[currentIndexEditingWord]);
      });
      if (enterEntity) {
        updateLettersStatus();
        if (enterEntity.equals(entityToGuess!)) {
          setWin(true);
          onOpen();
          return;
        }
        setCurrentIndexEditingWord(currentIndexEditingWord + 1);
        if (currentIndexEditingWord === 5) {
          onOpen();
        }
        if (currentIndexEditingWord > 5) {
          setWords([...words, ""]);
        }
      } else {
        setError(true);
      }
    }
  }

  const updateLettersStatus = () => {
    const word = words[currentIndexEditingWord].toUpperCase();
    const entityName = entityToGuess!.name.toUpperCase();
    for (let i = 0; i < word.length; i++) {
      const letter = word.charAt(i);
      if (entityName.charAt(i) === letter) {
        lettersStatus.set(letter, "good");
      } else if (entityName.includes(letter) && lettersStatus.get(letter) !== "good") {
        lettersStatus.set(letter, "bad spot");
      } else {
        lettersStatus.set(letter, "not good");
      }
    }
    setLettersStatus(new Map(lettersStatus));
  }

  useEffect(() => {

    if (scrollableWrapperRef.current) {
      const scrollElement = scrollableWrapperRef.current as HTMLElement;
      scrollElement.scrollTo(0, scrollElement.scrollHeight);
    }

    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Enter') {
        pressEnter();
      }
      if (/^[a-zA-Z]$/.test(event.key) && words[currentIndexEditingWord].length < 12) {
        pressLetter(event.key.toUpperCase());
      }
      if (event.key === 'Backspace') {
        pressBackspace();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndexEditingWord, words, entitiesData, win]);

  const reset = () => {
    setWords(["", "", "", "", "", ""]);
    setCurrentIndexEditingWord(0);
    const entities = allEntitiesData.filter((entity: T) => true /*genSelected[pokemon.generation - 1]*/);
    setEntitiesData(entities);
    setEntityToGuess(service.getRandom(entities));
    setLettersStatus(new Map(alphabetMap));
    setWin(false);
    onClose();
  }

  const continueGame = () => {
    setWords([...words, ""]);
    onClose();
  }

  const removeFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  }


  if (!entitiesData || entitiesData.length === 0 || !entityToGuess) {
    return <Center h="100%" minH="inherit">
      <Spinner size="xl" />
    </Center>;
  }

  return (
    <>
      <Box h="var(--height)" minH="inherit" maxH="var(--height)" display="flex" flexDir="column">
        <Box h="20px"></Box>
        <Box className='flex-center'>
          {/* <GenSelect triggerChange={setGenSelected}></GenSelect> */}
          <Box w="10px"></Box>
          <IconButton w={50} h={50} fontSize="20px" aria-label="Recommencer" icon={<MdRefresh/>} onClick={reset} onFocus={removeFocus}></IconButton>
        </Box>
        <Box h="20px"></Box>
        <Box overflowY="auto" ref={scrollableWrapperRef} flex={1}>
          <Box className='flex-center'>
            <Board words={words} entityToGuess={entityToGuess} currentIndexEditingWord={currentIndexEditingWord} error={error}></Board>
          </Box>
        </Box>
        <Box h="20px"></Box>
        <Box pb="30px">
          <Keyboard lettersStatus={lettersStatus} onLetterClick={pressLetter} onBackspaceClick={pressBackspace} onEnterClick={pressEnter}></Keyboard>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{win ? "Gagné !" : "Perdu !"}</ModalHeader>
          <ModalBody>
            {win 
            ? "Vous avez gagnés. Voulez vous recommencer ?"
            : "Vous avez perdus. Voulez vous quand même continuer ou recommencer ?"}
          </ModalBody>
          <ModalFooter>
            <Button onClick={win ? onClose : reset} mr={3}>{win ? "Fermer" : "Recommencer"}</Button>
            <Button onClick={win ? reset : continueGame}>{win ? "Recommencer" : "Continuer"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};