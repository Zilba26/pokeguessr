import { Input, Box, border, Button, useColorModeValue } from "@chakra-ui/react"
import { useGameContext } from "../contextProvider"
import { Entity } from "../../../models/Entity";

export function AutocompleteDropdown<T extends Entity>() {

    const { dropdownEntities, onGuessInputChange, handleKeyDown, win, selectedEntity, enterEntity } = useGameContext();

    const border = useColorModeValue('black', 'white');
    const bg = useColorModeValue('whiteal', 'gray.700');
    const hoverBg = useColorModeValue('gray.100', 'gray.600');

    return <div className='guess'>
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
}