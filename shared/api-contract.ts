import type { PokemonDetailsDTO } from "./api-types.ts";
import { ApiRoutes } from "./api-routes.ts";
import { Character } from 'genshin-db';

export interface ApiContract {
  [ApiRoutes.pokemonById]: {
    params: { pokemonId: number };
    response: PokemonDetailsDTO;
  };

  [ApiRoutes.allPokemon]: {
    params: undefined;
    response: PokemonDetailsDTO[];
  };

  [ApiRoutes.allGenshinCharacters]: {
    params: undefined;
    response: Character[];
  };
}
