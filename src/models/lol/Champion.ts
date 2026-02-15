import { Entity } from "../Entity";

export class Champion extends Entity {
    role!: string;
    bePrice!: number;
    rpPrice!: number;
    style!: number;
    difficulty!: number;
    releaseDate!: Date;
    lastChanged!: string;
    class!: string[];
    legacyClasses!: string[];
    resource!: string;
    rangeType!: string;
    adaptiveType!: string;
    stats!: ChampionStats;

    constructor(data: Partial<Champion>) {
        super(data.id!, data.name!, "https://ddragon.leagueoflegends.com/cdn/16.3.1/img/champion/" + data.name!.replace(" ", "") + ".png");
        if (typeof data.releaseDate === "string") {
            data.releaseDate = new Date(data.releaseDate);
        }
        Object.assign(this, data);
    }

}

class ChampionStats {
    hp!: number;
    hp5!: number;
    ar!: number;
    ad!: number;
    mr!: number;
    critDmg!: number;
    ms!: number;
    attackRange!: number;
    baseAs!: number;
    windupPercent!: number;
    asRatio!: number;
    bonusAs!: number;
    gameplayRadius!: number;
    selectionRadius!: number;
    pathingRadius!: number;
    selectionHeight!: number;
    acquisitionRadius!: number;

    constructor(data: Partial<ChampionStats>) {
        Object.assign(this, data);
    }
}