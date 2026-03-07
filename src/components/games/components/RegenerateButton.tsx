import { Box, Button } from "@chakra-ui/react";
import { Entity } from "../../../models/Entity";
import { useGameContext } from "../contextProvider";

export function RegenerateButton<T extends Entity>() {

    const { regenerateEntity, onOpen } = useGameContext();

    return <Box display="flex" gap="10px">
        <Button onClick={regenerateEntity}>Regénérer</Button>
        <Button onClick={onOpen}>⚙️</Button>
    </Box>;
}