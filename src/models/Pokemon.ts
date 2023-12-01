import { Type } from "./Type";

export class Pokemon {
    pokedexId: number;
    name: string;
    sprite: string;
    types: Type[];
    weight: number;
    height: number;
    generation: Generation;
    description: string;
    evolutionStage: EvolutionStage;

    constructor(id: number, name: string, sprite: string, types: Type[], weight: number, height: number, 
        generation: Generation, description: string, evolutionStage: EvolutionStage) {
        this.pokedexId = id;
        this.name = name;
        this.sprite = sprite;
        this.types = types;
        this.weight = weight;
        this.height = height;
        this.generation = generation;
        this.description = description;
        this.evolutionStage = evolutionStage;
    }


}
export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EvolutionStage = 1 | 2 | 3;