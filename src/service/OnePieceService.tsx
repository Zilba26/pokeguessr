import { Attribut } from "../models/Attribut";
import { OnePieceAttribut } from "../models/one-piece/OnePieceAttribut";
import { OnePieceCharacter } from "../models/one-piece/OnePieceCharacter";
import { OnePieceAPI } from "../repository/OnePieceAPI";
import { EntityFilterController, EntityService } from "./EntityService";

export class OnePieceService extends EntityService<OnePieceCharacter> {

  private readonly onePieceRepository: OnePieceAPI = new OnePieceAPI();

  private static luffy: OnePieceCharacter | undefined;

  constructor() {
    super("OnePiece");
  }

  public getSpriteColumnName(): string {
    return "Personnage";
  }

  public async getAll(): Promise<OnePieceCharacter[]> {
    const characters = await this.onePieceRepository.getAll();
    OnePieceService.luffy = characters.find((character: OnePieceCharacter) => character.name.includes("Luffy"));
    return characters;
  }

  public getBaseEntity(): OnePieceCharacter | undefined {
    return OnePieceService.luffy;
  }

  public getAllAttributs(): Attribut<any, OnePieceCharacter>[] {
    return OnePieceAttribut.values();
  }
  public getBaseAttributs(): Attribut<any, OnePieceCharacter>[] {
    return OnePieceAttribut.baseValue();
  }
  public getAttributFromId(id: any): Attribut<any, OnePieceCharacter> | undefined {
    return OnePieceAttribut.fromId(id);
  }
  
  public getFilterController(): EntityFilterController<OnePieceCharacter> | undefined {
    return undefined;
  }
  
}
