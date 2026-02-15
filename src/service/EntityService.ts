import { Entity } from "../models/Entity";
import { LocalStorageService } from "./LocalStorageService";

export abstract class EntityService<E extends Entity> extends LocalStorageService<E> {

    abstract getSpriteColumnName(): string;
    abstract getAll(): Promise<E[]>;
    abstract getFilterController(): EntityFilterController<E> | undefined;
    abstract getBaseEntity(): E | undefined;

    constructor(entityName: string) {
        super(entityName);
    }

    public getRandom(entities: E[]): E {
        const randomIndex: number = Math.floor(Math.random() * entities.length);
        return entities[randomIndex];
    }

}

export interface EntityFilterController<T extends Entity> {
    filter(entity: T): boolean;
    render?: () => React.ReactNode;
}