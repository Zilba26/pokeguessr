import { HelpTooltip } from "../../components/utils/HelpTooltip";
import { Attribut, AttributColumn } from "../Attribut";
import { GenshinImpactCharacter } from "./GenshinImpactCharacter";

export class GenshinImpactAttribut<T> extends Attribut<T, GenshinImpactCharacter> {

    static readonly ELEMENT = new GenshinImpactAttribut<string>(
        "Élément",
        [{ label: "Élément", value: (character: GenshinImpactCharacter) => character.element }]
    );
    static readonly WEAPON_TYPE = new GenshinImpactAttribut<string>(
        "Type d'arme",
        [{ label: "Type d'arme", value: (character: GenshinImpactCharacter) => character.weaponType }]
    );
    static readonly GENDER = new GenshinImpactAttribut<string>(
        "Genre",
        [{ label: "Genre", value: (character: GenshinImpactCharacter) => character.gender }]
    );
    static readonly NATION = new GenshinImpactAttribut<string>(
        "Nation",
        [{ label: "Nation", value: (character: GenshinImpactCharacter) => character.nation }]
    );
    static readonly RARITY = new GenshinImpactAttribut<string>(
        "Rareté",
        [{ label: "Rareté", value: (character: GenshinImpactCharacter) => character.rarity }]
    );
    static readonly RELEASE_DATE = new GenshinImpactAttribut<Date>(
        "Date de sortie",
        [{ label: "Date de sortie", value: (character: GenshinImpactCharacter) => character.releaseDate, withArrow: true }]
    );
    static readonly BIRTHDAY_DATE = new GenshinImpactAttribut<Date>(
        "Date d'anniversaire",
        [{ label: "Anniversaire", value: (character: GenshinImpactCharacter) => character.birthday, withArrow: true }]
    );

    private constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<any, GenshinImpactCharacter>[]
    ) {super(id, columns);}

    public static fromId(id: string): GenshinImpactAttribut<any> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    public static baseValue(): GenshinImpactAttribut<any>[] {
        return this.values();
    }

    public static values(): GenshinImpactAttribut<any>[] {
        return [
            GenshinImpactAttribut.ELEMENT,
            GenshinImpactAttribut.WEAPON_TYPE,
            GenshinImpactAttribut.GENDER,
            GenshinImpactAttribut.NATION,
            GenshinImpactAttribut.RARITY,
            GenshinImpactAttribut.RELEASE_DATE,
            GenshinImpactAttribut.BIRTHDAY_DATE
        ];
    }
}