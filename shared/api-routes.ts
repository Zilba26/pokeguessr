export const ApiRoutes = {
  pokemonById: "/api/pokemon/<pokemonId>",
  allPokemon: "/api/pokemon"
} as const;

export type ApiRoute = typeof ApiRoutes[keyof typeof ApiRoutes];
