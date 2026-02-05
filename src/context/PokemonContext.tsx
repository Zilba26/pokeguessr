import { Pokemon } from '../models/pokemon/Pokemon';
import { createEntityContext } from './EntityContext';
import { EntityFilterController } from '../components/guess-stats/GuessStats';
import GenSelect from '../components/gen-select/GenSelect';

export const { Provider: PokemonProvider, useData: useDataPokemon } = createEntityContext<Pokemon>();

export class PokemonGenerationFilter implements EntityFilterController<Pokemon> {
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
