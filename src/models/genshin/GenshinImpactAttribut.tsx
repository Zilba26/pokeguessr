import { DateStringabble, Stringabble } from "../../utils/Stringabble";
import { Attribut, AttributColumn } from "../Attribut";
import { GenshinImpactCharacter } from "./GenshinImpactCharacter";

export class GenshinImpactAttribut<T extends Stringabble> extends Attribut<T, GenshinImpactCharacter> {

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
    static readonly RARITY = new GenshinImpactAttribut<number>(
        "Rareté",
        [{ label: "Rareté", value: (character: GenshinImpactCharacter) => character.rarity }]
    );
    static readonly RELEASE_VERSION = new GenshinImpactAttribut<string>(
        "Version de sortie",
        [{ label: "Version de sortie", value: (character: GenshinImpactCharacter) => character.releaseVersion }]
    );
    static readonly BIRTHDAY_DATE = new GenshinImpactAttribut<DateStringabble>(
        "Date d'anniversaire",
        [{ label: "Anniversaire", value: (character: GenshinImpactCharacter) => DateStringabble.withDayMonth(character.birthday) }]
    );

    private constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<T, GenshinImpactCharacter>[]
    ) {super(id, columns);}

    public static fromId(id: string): GenshinImpactAttribut<Stringabble> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    public static baseValue(): GenshinImpactAttribut<Stringabble>[] {
        return this.values();
    }

    public static values(): GenshinImpactAttribut<Stringabble>[] {
        return [
            GenshinImpactAttribut.ELEMENT,
            GenshinImpactAttribut.WEAPON_TYPE,
            GenshinImpactAttribut.GENDER,
            GenshinImpactAttribut.NATION,
            GenshinImpactAttribut.RARITY,
            GenshinImpactAttribut.RELEASE_VERSION,
            GenshinImpactAttribut.BIRTHDAY_DATE
        ];
    }
}