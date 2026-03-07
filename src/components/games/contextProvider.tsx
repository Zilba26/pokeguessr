import "./GameProvider.scss"
import { useContext, createContext } from "react";
import { useGame } from "./useGame";
import { EntityService } from "../../service/EntityService";
import { Entity } from "../../models/Entity";
import { SettingsModal } from "./components/settings-modal/SettingsModal";
import { Box } from "@chakra-ui/react";

const GameContext = createContext<ReturnType<typeof useGame<any>> | null>(null);

export interface GameProviderProps<T extends Entity> extends React.PropsWithChildren {
  useData: () => T[];
  service: EntityService<T>;
  options?: {
    onRegenerate?: () => void;
    onEnterGuess?: (guess: T) => void;
    onWin?: () => void;
  }
}

export const GameProvider = <T extends Entity,>(props: GameProviderProps<T>) => {
  const logic = useGame<T>(props);
  return (
    <GameContext.Provider value={logic}>
      <div id="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <Box className="random">
        {props.children}
      </Box>
      <SettingsModal service={props.service} isOpen={logic.isOpen} onClose={logic.onClose} />
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used inside GameProvider");
  return ctx;
};
