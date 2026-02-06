import { Pokemon } from "./Pokemon";
import { Type } from "./Type";
import { HelpTooltip } from "../../components/utils/HelpTooltip";
import { Attribut, AttributColumn } from "../Attribut";

export class PokemonAttribut<T> extends Attribut<T, Pokemon> {

    static readonly TYPE = new PokemonAttribut<Type[]>(
        "Types",
        [{ label: "Type 1", value: (pokemon: Pokemon) => pokemon.types[0] },
         { label: "Type 2", value: (pokemon: Pokemon) => pokemon.types[1] ?? "Aucun" }]
    );
    static readonly GENERATION = new PokemonAttribut<number>(
        "Génération",
        [{ label: "Génération", value: (pokemon: Pokemon) => pokemon.generation }]
    );
    static readonly EVOLUTION_STAGE = new PokemonAttribut<number>(
        "Stade d'évolution",
        [{ label: <>Stade<br/>d'évolution</>, value: (pokemon: Pokemon) => pokemon.evolutionStage }]
    );
    static readonly COLOR = new PokemonAttribut<string>(
        "Couleur",
        [{ label: "Couleur", value: (pokemon: Pokemon) => pokemon.color }]
    );
    static readonly HABITAT = new PokemonAttribut<string>(
        "Habitat",
        [{ label: <>Habitat <HelpTooltip text="Seuls les pokemons de la 1ère à la 3ème génération ont un habitat défini." /></>, value: (pokemon: Pokemon) => pokemon.habitat }]
    );
    static readonly WEIGHT = new PokemonAttribut<number>(
        "Poids",
        [{ label: "Poids (Kg)", value: (pokemon: Pokemon) => pokemon.weight, withArrow: true }]
    );
    static readonly HEIGHT = new PokemonAttribut<number>(
        "Taille",
        [{ label: "Taille (m)", value: (pokemon: Pokemon) => pokemon.height, withArrow: true }]
    );
    static readonly HP = new PokemonAttribut<number>(
        "Points de vie",
        [{ label: "HP", value: (pokemon: Pokemon) => pokemon.stats.hp, withArrow: true }]
    );
    static readonly ATTACK = new PokemonAttribut<number>(
        "Attaque",
        [{ label: "Attaque", value: (pokemon: Pokemon) => pokemon.stats.attack, withArrow: true }]
    );
    static readonly DEFENSE = new PokemonAttribut<number>(
        "Défense",
        [{ label: "Défense", value: (pokemon: Pokemon) => pokemon.stats.defense, withArrow: true }]
    );
    static readonly SPECIAL_ATTACK = new PokemonAttribut<number>(
        "Attaque Spéciale",
        [{ label: "Attaque Spé.", value: (pokemon: Pokemon) => pokemon.stats.specialAttack, withArrow: true }]
    );
    static readonly SPECIAL_DEFENSE = new PokemonAttribut<number>(
        "Défense Spéciale",
        [{ label: "Défense Spé.", value: (pokemon: Pokemon) => pokemon.stats.specialDefense, withArrow: true }]
    );
    static readonly SPEED = new PokemonAttribut<number>(
        "Vitesse",
        [{ label: "Vitesse", value: (pokemon: Pokemon) => pokemon.stats.speed, withArrow: true }]
    );

    private constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<any, Pokemon>[]
    ) {super(id, columns);}

    public static fromId(id: string): PokemonAttribut<any> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    public static baseValue(): PokemonAttribut<any>[] {
        return [
            PokemonAttribut.TYPE,
            PokemonAttribut.GENERATION,
            PokemonAttribut.EVOLUTION_STAGE,
            PokemonAttribut.COLOR,
            PokemonAttribut.HABITAT,
            PokemonAttribut.WEIGHT,
            PokemonAttribut.HEIGHT,
        ];
    }

    public static values(): PokemonAttribut<any>[] {
        return [
            PokemonAttribut.TYPE,
            PokemonAttribut.GENERATION,
            PokemonAttribut.EVOLUTION_STAGE,
            PokemonAttribut.COLOR,
            PokemonAttribut.HABITAT,
            PokemonAttribut.WEIGHT,
            PokemonAttribut.HEIGHT,
            PokemonAttribut.HP,
            PokemonAttribut.ATTACK,
            PokemonAttribut.DEFENSE,
            PokemonAttribut.SPECIAL_ATTACK,
            PokemonAttribut.SPECIAL_DEFENSE,
            PokemonAttribut.SPEED,
        ];
    }
}