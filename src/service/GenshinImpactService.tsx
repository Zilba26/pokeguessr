import { Attribut } from "../models/Attribut";
import { GenshinImpactAttribut } from "../models/genshin/GenshinImpactAttribut";
import { GenshinImpactCharacter } from "../models/genshin/GenshinImpactCharacter";
import { GenshinImpactAPI } from "../repository/GenshinImpactAPI";
import { EntityFilterController, EntityService } from "./EntityService";

export class GenshinImpactService extends EntityService<GenshinImpactCharacter> {

  private readonly genshinImpactRepository: GenshinImpactAPI = new GenshinImpactAPI();

  private static amber: GenshinImpactCharacter | undefined;

  constructor() {
    super("GenshinImpact");
  }

  public getSpriteColumnName(): string {
    return "Personnage";
  }

  public async getAll(): Promise<GenshinImpactCharacter[]> {
    const characters = await this.genshinImpactRepository.getAll();
    GenshinImpactService.amber = characters.find((character) => character.name === "Amber");
    return characters;
  }

  public getBaseEntity(): GenshinImpactCharacter | undefined {
    return GenshinImpactService.amber;
  }

  public getAllAttributs(): Attribut<any, GenshinImpactCharacter>[] {
    return GenshinImpactAttribut.values();
  }
  public getBaseAttributs(): Attribut<any, GenshinImpactCharacter>[] {
    return GenshinImpactAttribut.baseValue();
  }
  public getAttributFromId(id: any): Attribut<any, GenshinImpactCharacter> | undefined {
    return GenshinImpactAttribut.fromId(id);
  }
  
  public getFilterController(): EntityFilterController<GenshinImpactCharacter> | undefined {
    return undefined;
  }
  
}
