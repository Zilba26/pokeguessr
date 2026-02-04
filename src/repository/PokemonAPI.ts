import { Generation, Pokemon } from "../models/pokemon/Pokemon";

export interface PokemonAPI {
    getPokemon(id: number) : Promise<Pokemon>;

    getAllPokemon() : Promise<Pokemon[]>;

}