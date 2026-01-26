import { Tooltip, Box, IconButton } from "@chakra-ui/react";
import { FC } from "react";

interface HelpTooltipProps {
    text: string;
}

export const HelpTooltip: FC<HelpTooltipProps> = (props: HelpTooltipProps) => {
    return (
        <Tooltip label={props.text} placement="top" hasArrow>
            <IconButton
                aria-label="Help"
                icon={<Box>?</Box>}
                size="sm"
                variant="solid"
                borderRadius="full"
                minW="25px"
                h="25px"
                p="0"
                m="1"
            />
        </Tooltip>
    );
}