import { Pokemon } from "../models/Pokemon";
import { PokemonAPI } from "../repository/PokemonAPI";
import { TyradexAPI } from "../repository/TyradexAPI";

export class PokemonService {
  private readonly pokemonRepository: PokemonAPI = new TyradexAPI();

  public async getPokemonsByGenSelected(genSelected: boolean[]): Promise<Pokemon[]> {
    const pokemons: Pokemon[] = await this.pokemonRepository.getAllPokemon();
    const pokemonsByGenSelected: Pokemon[] = pokemons.filter((pokemon: Pokemon) => {
      return genSelected[pokemon.generation-1];
    });
    return pokemonsByGenSelected;
  }

  public getRandomPokemon(pokemons: Pokemon[]): Pokemon {
    const randomIndex: number = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
  }

  public async getAllPokemons(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAllPokemon();
  }
}