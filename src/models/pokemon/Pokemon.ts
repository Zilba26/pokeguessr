import { Entity } from "../Entity";
import { PokemonStats } from "./PokemonStats";
import { Type } from "./Type";

export class Pokemon extends Entity {
    types: Type[];
    weight: number;
    height: number;
    generation: Generation;
    description: string;
    evolutionStage: EvolutionStage;
    color: string;
    habitat: string;
    stats: PokemonStats;

    constructor(pokedexId: number, name: string, sprite: string, types: Type[], weight: number, height: number,
        generation: Generation, description: string, evolutionStage: EvolutionStage, color: string, habitat: string, stats: PokemonStats) {
        super(pokedexId, name, sprite);
        this.types = types;
        this.weight = weight;
        this.height = height;
        this.generation = generation;
        this.description = description;
        this.evolutionStage = evolutionStage;
        this.color = color;
        this.habitat = habitat;
        this.stats = stats;
    }

}
export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EvolutionStage = 1 | 2 | 3;