import { OnePieceCharacter } from '../models/one-piece/OnePieceCharacter';
import { createEntityContext } from './EntityContext';

export const { Provider: OnePieceProvider, useData: useDataOnePiece } = createEntityContext<OnePieceCharacter>();
