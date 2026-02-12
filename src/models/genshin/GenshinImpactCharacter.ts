import { Entity } from "../Entity";

export class GenshinImpactCharacter extends Entity {
    element: string;
    weaponType: string;
    gender: string;
    nation: string;
    rarity: number;
    releaseVersion: string;
    birthday: Date;

    constructor(id: number, name: string, sprite: string, element: string, weaponType: string, gender: string, nation: string, rarity: number, releaseVersion: string, birthday: Date) {
        super(id, name, sprite);
        this.element = element;
        this.weaponType = weaponType;
        this.gender = gender;
        this.nation = nation;
        this.rarity = rarity;
        this.releaseVersion = releaseVersion;
        this.birthday = birthday;
    }
}