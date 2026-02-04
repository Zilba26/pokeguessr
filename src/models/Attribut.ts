import { Entity } from "./Entity";

type ColumnValue<A, E extends Entity> = (entity: E) => A;

interface AttributColumn<T, E extends Entity> {
    label: React.ReactNode;
    value: ColumnValue<T, E>;
    withArrow?: boolean;
}

export abstract class Attribut<A, E extends Entity> {

    protected constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<A, E>[]
    ) {}

    public fromId(id: string): Attribut<A, E> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    abstract values(): Attribut<A, E>[];

    // abstract baseValues(): T[];
}