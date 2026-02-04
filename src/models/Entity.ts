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
        const name1 = this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const name2 = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        return name1 === name2;
    }
}