import { Attribut } from "../models/Attribut";
import { Champion } from "../models/lol/Champion";
import { ChampionAttribut } from "../models/lol/ChampionAttribute";
import { LolApi } from "../repository/LolApi";
import { EntityFilterController, EntityService } from "./EntityService";

export class LolService extends EntityService<Champion> {

    private static teemo: Champion | undefined;

    constructor() {
        super("League of Legends");
    }

    getSpriteColumnName(): string {
        return "Champion";
    }

    async getAll(): Promise<Champion[]> {
        const champions = await new LolApi().getAllChampions();
        LolService.teemo = champions.find((champion) => champion.name === "Teemo");
        return champions;
    }

    getFilterController(): EntityFilterController<Champion> | undefined {
        return undefined;
    }

    getBaseEntity(): Champion | undefined {
        return LolService.teemo;
    }

    getAllAttributs(): Attribut<any, Champion>[] {
        return ChampionAttribut.values();
    }

    getBaseAttributs(): Attribut<any, Champion>[] {
        return ChampionAttribut.baseValue();
    }

    getAttributFromId(id: any): Attribut<any, Champion> | undefined {
        return ChampionAttribut.fromId(id);
    }

}