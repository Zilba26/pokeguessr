import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, Box, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Image } from "@chakra-ui/react";
import { Entity } from "../../../models/Entity";
import { EntityService } from "../../../service/EntityService";
import { useState } from "react";

interface BlurRevealSettingsModalProps<T extends Entity> {
    service: EntityService<T>;
    isOpen: boolean;
    onClose: () => void;
}

export const BlurRevealSettingsModal = <T extends Entity>(props: BlurRevealSettingsModalProps<T>) => {
    const { isOpen, onClose, service } = props;

    const entity = service.getBaseEntity()!;

    const [blurAmount, setBlurAmount] = useState(service.getBlurAmount());
    const [blurDecrementation, setBlurDecrementation] = useState(service.getBlurDecrementation());

    const save = () => {
        service.saveBlurAmount(blurAmount);
        service.saveBlurDecrementation(blurDecrementation);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent width="auto" minW="20vw" maxW="auto">
                <ModalHeader>Changer le floutage</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" gap="30px" m="10px">
                    <Box display="flex" gap="10px">
                        <Text>Quantité de floutage au départ</Text>
                        <Slider
                            value={blurAmount}
                            onChange={setBlurAmount}
                            min={0}
                            max={50}
                            width="xl"
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px'>
                                <Text>{blurAmount}</Text>
                            </SliderThumb>
                        </Slider>
                    </Box>
                    <Box display="flex" gap="10px">
                        <Text>Quantité de floutage retirée à chaque essai</Text>
                        <Slider
                            value={blurDecrementation}
                            onChange={setBlurDecrementation}
                            min={1}
                            max={10}
                            width="xl"
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px'>
                                <Text>{blurDecrementation}</Text>
                            </SliderThumb>
                        </Slider>
                    </Box>
                    <Box display="flex" gap="10px">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                src={entity.sprite}
                                h="200px"
                                filter={`blur(${blurAmount - blurDecrementation * index}px)`}
                            />
                        ))}
                    </Box>
                </ModalBody>
                <ModalFooter display="flex" gap="10px">
                    <Button variant="ghost" mr={3} onClick={onClose}>Fermer</Button>
                    <Button colorScheme='blue' onClick={() => {
                        setBlurAmount(30);
                        setBlurDecrementation(3);
                    }}>Réinitialiser</Button>
                    <Button colorScheme='blue' onClick={save}>Enregistrer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}