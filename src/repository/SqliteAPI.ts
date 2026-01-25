import { Pokemon, Generation, EvolutionStage } from "../models/Pokemon";
import { PokemonAPI } from "./PokemonAPI";
import { apiFetch } from "../../shared/api-client";
import { ApiRoutes } from "../../shared/api-routes";
import { PokemonDetailsDTO } from "../../shared/api-types";

export class SqliteAPI implements PokemonAPI {

    async getPokemon(id: number): Promise<Pokemon> {
        const pokemon = await apiFetch(ApiRoutes.pokemonById, { pokemonId: id });
        return SqliteAPI.mapPokemonRecordToModel(pokemon);
    }

    async getAllPokemon(): Promise<Pokemon[]> {
        const pokemons = await apiFetch(ApiRoutes.allPokemon);
        return pokemons.map(SqliteAPI.mapPokemonRecordToModel);
    }

    private static getSpriteUrl(pokedexId: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexId}.png`;
    }

    static mapPokemonRecordToModel(pokemon: PokemonDetailsDTO): Pokemon {
        return new Pokemon(
            pokemon!.id,
            pokemon!.pokemon_species!.pokemon_species_names[0].name || "",
            SqliteAPI.getSpriteUrl(pokemon!.id),
            pokemon!.pokemon_types
                .sort((a, b) => a.slot - b.slot)
                .map(pt => pt.types!.type_names[0].name as any),
            pokemon!.weight / 10,
            pokemon!.height / 10,
            pokemon!.pokemon_species!.generations!.id as Generation,
            "",
            SqliteAPI.getEvolutionStage(pokemon.pokemon_species!)
        );
    }

    static getEvolutionStage(pokemon: PreEvolution): EvolutionStage {
        let currentEvolution = pokemon?.pre_evolution;
        if (!currentEvolution) {
            return 1;
        } else {
            return 1 + SqliteAPI.getEvolutionStage(currentEvolution) as EvolutionStage;
        }
    }
}

type PreEvolution = {
    id: number;
    pre_evolution?: PreEvolution | null;
};