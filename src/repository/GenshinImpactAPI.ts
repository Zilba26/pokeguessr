import { Character } from "genshin-db";
import { apiFetch } from "../../shared/api-client";
import { ApiRoutes } from "../../shared/api-routes";
import { GenshinImpactCharacter } from "../models/genshin/GenshinImpactCharacter";

export class GenshinImpactAPI {

    async getAll(): Promise<GenshinImpactCharacter[]> {
        const characters = await apiFetch(ApiRoutes.allGenshinCharacters)
        return characters.map((characterJson) => this.parseCharacter(characterJson));
    }

    private parseCharacter(json: Character): GenshinImpactCharacter {
        return new GenshinImpactCharacter(
            json.id,
            json.name,
            json.images.hoyowiki_icon ?? json.images.mihoyo_icon,
            json.elementText,
            json.weaponText,
            json.gender,
            json.region,
            json.rarity,
            json.version,
            json.birthdaymmdd ? new Date(new Date().getFullYear() + '-' + json.birthdaymmdd) : new Date(0),
        );
    }
    
}
