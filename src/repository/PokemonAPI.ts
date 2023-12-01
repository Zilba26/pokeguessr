import { Generation, Pokemon } from "../models/Pokemon";

export interface PokemonAPI {
    url: string;

    getPokemon(id: number) : Promise<Pokemon>;

    getAllPokemon() : Promise<Pokemon[]>;

    getAllGenerationPokemon(generation: Generation) : Promise<Pokemon[]>;

    getGenerations() : Promise<Generation[]>;
}