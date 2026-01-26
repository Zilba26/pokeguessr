export type PokemonDetailsDTO = {
    id: number;
    height: number;
    weight: number;
    pokemon_species: {
        id: number;
        pokemon_habitats: {
            pokemon_habitat_names: { name: string | null; }[];
        } | null;
        pokemon_colors: {
            pokemon_color_names: { name: string; }[];
        };
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