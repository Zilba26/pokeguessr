import { OnePieceCharacter } from "../models/one-piece/OnePieceCharacter";

export class OnePieceAPI {

    async getAll(): Promise<OnePieceCharacter[]> {
        const characters = await fetch("https://api.api-onepiece.com/v2/characters/fr");
        const json = await characters.json();
        return json.map((char: any) => this.parseCharacter(char));
    }

    private parseCharacter(json: any): OnePieceCharacter {
        return new OnePieceCharacter(
            json.id,
            json.name,
            "",
            this.parseNullableInt(json.size?.replace("cm", ""), "Inconnu"),
            this.parseNullableInt(json.age?.replace(" ans", ""), "Inconnu"),
            this.parseNullableInt(json.bounty?.replaceAll(".", ""), "Aucune"),
            json.crew?.name ?? "Aucun",
            json.devilFruit?.type ?? "Aucun",
            json.job ?? "Inconnu",
            json.status ?? "Inconnu"
        );
    }

    private parseNullableInt(nb: any, defaultValue: any): any {
        const nbParsed = parseInt(nb);
        return isNaN(nbParsed) ? defaultValue : nbParsed;
    }
    
}
