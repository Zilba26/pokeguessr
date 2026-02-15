import { Entity } from "../Entity";

export class OnePieceCharacter extends Entity {
    size: number;
    age: number;
    bounty: number;
    crew: string;
    devilFruit: string;
    job: string;
    status: string;


    constructor(id: number, name: string, sprite: string, size: number, age: number, bounty: number, crew: string, devilFruit: string, job: string, status: string) {
        super(id, name, sprite);
        this.size = size;
        this.age = age;
        this.bounty = bounty;
        this.crew = crew;
        this.devilFruit = devilFruit;
        this.job = job;
        this.status = status;
    }
}