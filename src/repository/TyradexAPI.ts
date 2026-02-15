import { Pokemon, Generation } from "../models/pokemon/Pokemon";
import { PokemonStats } from "../models/pokemon/PokemonStats";
import { Type } from "../models/pokemon/Type";
import { PokemonAPI } from "./PokemonAPI";

export class TyradexAPI implements PokemonAPI {
    url: string = "https://tyradex.vercel.app/api/v1/";

    async getPokemon(id: number): Promise<Pokemon> {
        const url = this.url + "pokemon/" + id;
        const response = await fetch(url);
        const json = await response.json();
        return this.parsePokemon(json);
    }
    
    async getAllPokemon(): Promise<Pokemon[]> {
        const url = this.url + "pokemon";
        const response = await fetch(url);
        const json = await response.json();
        json.splice(0, 1);
        return json.map((pokemon: any) => this.parsePokemon(pokemon));
    }

    private parsePokemon(json: any): Pokemon {
        const types = json.types.map((type: any) => Type.getTypeByName(type.name));
        return new Pokemon(json.pokedexId, json.name.fr, json.sprites.regular, types, json.weight, json.height,
            json.generation, json.description, (json.evolution?.pre?.length ?? 0) + 1, 
            "Indéfini", "Indéfini", new PokemonStats(0,0,0,0,0,0));
    }
}
