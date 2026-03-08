import { Box, Button } from "@chakra-ui/react";
import { Entity } from "../../../models/Entity";
import { useGameContext } from "../contextProvider";

interface RegenerateButtonProps<T extends Entity> {
    onOpenSettings?: () => void;
}

export function RegenerateButton<T extends Entity>({ onOpenSettings }: RegenerateButtonProps<T>) {

    const { regenerateEntity } = useGameContext();

    return <Box display="flex" gap="10px">
        <Button onClick={regenerateEntity}>Regénérer</Button>
        {onOpenSettings && <Button onClick={onOpenSettings}>⚙️</Button>}
    </Box>;
}