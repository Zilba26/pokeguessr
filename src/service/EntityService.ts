import { Attribut } from "../models/Attribut";
import { Entity } from "../models/Entity";

export abstract class EntityService<E extends Entity> {

    abstract getEntityName(): string;
    abstract getAll(): Promise<E[]>;
    abstract getSetName(): Attribut<any, E>[];
    abstract getFilterController(): EntityFilterController<E> | undefined;

    getRandom(entities: E[]): E {
        const randomIndex: number = Math.floor(Math.random() * entities.length);
        return entities[randomIndex];
    }
}

export interface EntityFilterController<T extends Entity> {
  filter(entity: T): boolean;
  render?: () => React.ReactNode;
}