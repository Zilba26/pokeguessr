import { GenshinImpactCharacter } from '../models/genshin/GenshinImpactCharacter';
import { createEntityContext } from './EntityContext';

export const { Provider: GenshinImpactProvider, useData: useDataGenshinImpact } = createEntityContext<GenshinImpactCharacter>();
