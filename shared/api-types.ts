export type PokemonDetailsDTO = {
    id: number;
    height: number;
    weight: number;
    pokemon_species: {
        id: number;
        pokemon_habitats: {
            id: number;
            identifier: string;
        } | null;
        pre_evolution: {
            id: number;
            pre_evolution: {
                id: number;
                pre_evolution: {
                    id: number;
                } | null;
            } | null;
        } | null;
        generations: {
            id: number;
            identifier: string;
            main_region_id: number;
        } | null;
        pokemon_species_names: {
            name: string | null;
        }[];
    } | null;
    pokemon_types: {
        slot: number;
        types: {
            type_names: { name: string | null; }[];
        };
    }[];
};