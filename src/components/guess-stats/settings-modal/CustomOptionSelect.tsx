import { Box, IconButton } from "@chakra-ui/react";
import { OptionProps, chakraComponents } from "chakra-react-select";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Option } from "./Option";

export const CustomOption = (props: OptionProps<Option>) => {
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