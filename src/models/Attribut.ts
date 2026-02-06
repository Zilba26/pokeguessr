import { Entity } from "./Entity";

type ColumnValue<A, E extends Entity> = (entity: E) => A;

export interface AttributColumn<T, E extends Entity> {
    label: React.ReactNode;
    value: ColumnValue<T, E>;
    withArrow?: boolean;
}

export abstract class Attribut<A, E extends Entity> {

    protected constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<A, E>[]
    ) {}

}