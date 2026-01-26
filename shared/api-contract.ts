import type { PokemonDetailsDTO } from "./api-types.ts";
import { ApiRoutes } from "./api-routes.ts";

export interface ApiContract {
  [ApiRoutes.pokemonById]: {
    params: { pokemonId: number };
    response: PokemonDetailsDTO;
  };

  [ApiRoutes.allPokemon]: {
    params: undefined;
    response: PokemonDetailsDTO[];
  };
}
