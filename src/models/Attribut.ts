import { Stringabble } from "../utils/Stringabble";
import { Entity } from "./Entity";

type ColumnValue<A extends Stringabble, E extends Entity> = (entity: E) => A;

export interface AttributColumn<T extends Stringabble, E extends Entity> {
    label: React.ReactNode;
    value: ColumnValue<T, E>;
}

export abstract class Attribut<A extends Stringabble, E extends Entity> {

    protected constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<A, E>[]
    ) {}

}