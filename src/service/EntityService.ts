import { Entity } from "../models/Entity";

export abstract class EntityService<E extends Entity> {
    abstract getAll(): Promise<E[]>;

    getRandom(entities: E[]): E {
        const randomIndex: number = Math.floor(Math.random() * entities.length);
        return entities[randomIndex];
    }
}