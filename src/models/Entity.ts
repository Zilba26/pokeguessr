import { normalizeString } from "../utils/normalize";

export abstract class Entity {

    id: number;
    name: string;
    sprite: string;

    constructor(id: number, name: string, sprite: string) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
    }

    public equals(other: Entity): boolean {
        return this.id === other.id;
    }

    public equalsName(name: string): boolean {
        return normalizeString(this.name) === normalizeString(name);
    }
}