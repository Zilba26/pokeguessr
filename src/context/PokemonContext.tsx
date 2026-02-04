import { Pokemon } from '../models/pokemon/Pokemon';
import { createEntityContext } from './EntityContext';

export const { Provider: PokemonProvider, useData: useDataPokemon } = createEntityContext<Pokemon>();

