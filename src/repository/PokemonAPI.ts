import { Generation, Pokemon } from "../models/Pokemon";

export interface PokemonAPI {
    getPokemon(id: number) : Promise<Pokemon>;

    getAllPokemon() : Promise<Pokemon[]>;

}