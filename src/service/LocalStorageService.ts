import { Attribut } from "../models/Attribut";
import { Entity } from "../models/Entity";

export abstract class LocalStorageService<T extends Entity> {
    private entityName: string;

    constructor(entityName: string) {
        this.entityName = entityName;
    }

    private getCurrentSetKey(): string {
        return `${this.entityName}_current_set`;
    }

    private getSetsRegisteredKey(): string {
        return `${this.entityName}_sets_registered`;
    }

    abstract getAllAttributs(): Attribut<any, T>[];
    abstract getBaseAttributs(): Attribut<any, T>[];
    abstract getAttributFromId(id: any): Attribut<any, T> | undefined;
    protected getAdditionalPreRegisteredSets(): Map<string, Attribut<any, T>[]> {
        return new Map();
    }

    // Current set
    public getCurrentSet(): Attribut<any, T>[] {
        const data = localStorage.getItem(this.getCurrentSetKey());
        return data ? JSON.parse(data).map((id: any) => this.getAttributFromId(id)!) : this.getBaseAttributs();
    }

    public saveCurrentSet(setName: Attribut<any, T>[]): void {
        localStorage.setItem(this.getCurrentSetKey(), JSON.stringify(setName.map(attribut => attribut.id)));
    }

    // Registered sets
    public getRegisteredSets(): Map<string, Attribut<any, T>[]> {
        const data = localStorage.getItem(this.getSetsRegisteredKey());
        const result: Map<string, Attribut<any, T>[]> = new Map();
        if (data) {
            const parsedData: Map<string, string[]> = new Map(Object.entries(JSON.parse(data)));
            parsedData.forEach((ids, name) => {
                result.set(name, ids.map(id => this.getAttributFromId(id)!));
            });
        } else {
            result.set("Basique", this.getBaseAttributs());
            this.getAdditionalPreRegisteredSets().forEach((attributs, name) => {
                result.set(name, attributs);
            });
            this.saveRegisteredSets(result);
        }
        return result;
    }

    public saveRegisteredSets(setNames: Map<string, Attribut<any, T>[]>): void {
        const setNamesToSave: Map<string, string[]> = new Map();
        setNames.forEach((attributs, name) => {
            setNamesToSave.set(name, attributs.map(attribut => attribut.id));
        });
        localStorage.setItem(this.getSetsRegisteredKey(), JSON.stringify(Object.fromEntries(setNamesToSave)));
    }

    public saveSetWithName(setName: string, attributs: Attribut<any, T>[]): boolean {
        const registeredSets = this.getRegisteredSets();
        if (registeredSets.has(setName)) {
            return false;
        }
        registeredSets.set(setName, attributs);
        this.saveRegisteredSets(registeredSets);
        return true;
    }

    public deleteRegisteredSet(setName: string): void {
        const registeredSets = this.getRegisteredSets();
        registeredSets.delete(setName);
        this.saveRegisteredSets(registeredSets);
    }
}