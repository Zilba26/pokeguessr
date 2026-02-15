import { Champion } from "../models/lol/Champion";

export class LolApi {
    async getAllChampions(): Promise<Champion[]> {
        const res = await fetch("/.generated/champions-en-us.json");
        const data = await res.json();
        return data.map((champData: any) => new Champion(champData));
    }
}