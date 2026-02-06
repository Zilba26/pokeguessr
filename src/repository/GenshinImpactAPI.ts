import { GenshinImpactCharacter } from "../models/genshin/GenshinImpactCharacter";


export class GenshinImpactAPI {
    url: string = "https://genshin.jmp.blue/";
    
    async getAll(): Promise<GenshinImpactCharacter[]> {
        const url = this.url + "characters/all?lang=fr";
        const response = await fetch(url);
        const json = await response.json();
        return json.map((characterJson: any) => this.parseCharacter(characterJson));
    }

    private parseCharacter(json: any): GenshinImpactCharacter {
        return new GenshinImpactCharacter(
            json.id,
            json.name,
            `https://genshin.jmp.blue/characters/${json.id}/icon-big`,
            json.vision,
            json.weapon,
            json.gender,
            json.nation,
            json.rarity,
            this.parseDate(json.release),
            this.parseDate(json.birthday),
        );
    }

    private parseDate(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    }
}
