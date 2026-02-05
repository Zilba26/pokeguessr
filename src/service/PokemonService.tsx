import GenSelect from "../components/gen-select/GenSelect";
import { Attribut } from "../models/Attribut";
import { Pokemon } from "../models/pokemon/Pokemon";
import { PokemonAPI } from "../repository/PokemonAPI";
import { SqliteAPI } from "../repository/SqliteAPI";
import { TyradexAPI } from "../repository/TyradexAPI";
import { EntityFilterController, EntityService } from "./EntityService";
import { LocalStorageService } from "./LocalStorageService";

export class PokemonService extends EntityService<Pokemon> {

  private readonly pokemonRepository: PokemonAPI = new SqliteAPI();

  public getEntityName(): string {
    return "Pokemon";
  }

  public getSetName(): Attribut<any, Pokemon>[] {
    return LocalStorageService.getSetName();
  }
  
  public getFilterController(): EntityFilterController<Pokemon> | undefined {
    return new PokemonGenerationFilter();
  }

  public async getAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAllPokemon();
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