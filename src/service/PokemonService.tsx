import GenSelect from "../components/gen-select/GenSelect";
import { Attribut } from "../models/Attribut";
import { Pokemon } from "../models/pokemon/Pokemon";
import { PokemonAttribut } from "../models/pokemon/PokemonAttribut";
import { PokemonAPI } from "../repository/PokemonAPI";
import { SqliteAPI } from "../repository/SqliteAPI";
import { EntityFilterController, EntityService } from "./EntityService";

export class PokemonService extends EntityService<Pokemon> {

  private readonly pokemonRepository: PokemonAPI = new SqliteAPI();
  private static pikachu: Pokemon | undefined;

  constructor() {
    super("Pokemon");
  }

  public getSpriteColumnName(): string {
    return "Pokemon";
  }

  public getFilterController(): EntityFilterController<Pokemon> | undefined {
    return new PokemonGenerationFilter();
  }

  public async getAll(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.getAllPokemon();
    PokemonService.pikachu = pokemons.find((pokemon) => pokemon.id === 25);
    return pokemons;
  }

  public getBaseEntity(): Pokemon | undefined {
    return PokemonService.pikachu;
  }

  public getAllAttributs(): Attribut<any, Pokemon>[] {
    return PokemonAttribut.values();
  }

  public getBaseAttributs(): Attribut<any, Pokemon>[] {
    return PokemonAttribut.baseValue();
  }

  public getAttributFromId(id: any): Attribut<any, Pokemon> | undefined {
    return PokemonAttribut.fromId(id);
  }

  public getAdditionalPreRegisteredSets(): Map<string, Attribut<any, Pokemon>[]> {
    const additionalSets: Map<string, Attribut<any, Pokemon>[]> = new Map();
    additionalSets.set("Statistiques", [
      PokemonAttribut.HP,
      PokemonAttribut.ATTACK,
      PokemonAttribut.DEFENSE,
      PokemonAttribut.SPECIAL_ATTACK,
      PokemonAttribut.SPECIAL_DEFENSE,
      PokemonAttribut.SPEED
    ]);
    return additionalSets;
  }
}

class PokemonGenerationFilter implements EntityFilterController<Pokemon> {
  private genSelected: boolean[];

  constructor() {
    const stored = localStorage.getItem("genSelected");
    this.genSelected = stored
      ? JSON.parse(stored)
      : [true, true, true, true, true, true, true, true, true];
  }

  filter(pokemon: Pokemon): boolean {
    return this.genSelected[pokemon.generation - 1];
  }

  render(): React.ReactNode {
    return (
      <GenSelect
        triggerChange={(genSelected) => {
          this.genSelected = genSelected;
        }}
      />
    );
  }
}