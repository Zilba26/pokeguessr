import { Entity } from "../Entity";

export class GenshinImpactCharacter extends Entity {
    element: string;
    weaponType: string;
    gender: string;
    nation: string;
    rarity: number;
    releaseDate: Date;
    birthday: Date;

    constructor(id: number, name: string, sprite: string, element: string, weaponType: string, gender: string, nation: string, rarity: number, releaseDate: Date, birthday: Date) {
        super(id, name, sprite);
        this.element = element;
        this.weaponType = weaponType;
        this.gender = gender;
        this.nation = nation;
        this.rarity = rarity;
        this.releaseDate = releaseDate;
        this.birthday = birthday;
    }
}