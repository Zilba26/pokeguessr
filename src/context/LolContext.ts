import { Champion } from '../models/lol/Champion';
import { createEntityContext } from './EntityContext';

export const { Provider: LolProvider, useData: useDataLol } = createEntityContext<Champion>();
