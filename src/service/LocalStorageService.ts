import { PokemonAttribut } from "../models/pokemon/PokemonAttribut";

export class LocalStorageService {
    private static readonly POKEGUESS_GEN_SELECTED_KEY = "pokeguess_gen_selected";
    private static readonly POKEGUESS_SETNAME_KEY = "pokeguess_set_name";
    private static readonly POKEGUESS_SETSNAMES_REGISTERED_KEY = "pokeguess_setsnames_registered";

    public static init(): void {
        if (!localStorage.getItem(this.POKEGUESS_SETSNAMES_REGISTERED_KEY)) {
            const setNames: Map<string, PokemonAttribut<any>[]> = new Map();
            setNames.set("Basique", PokemonAttribut.baseValue());
            setNames.set("Statistiques", [
                PokemonAttribut.HP,
                PokemonAttribut.ATTACK,
                PokemonAttribut.DEFENSE,
                PokemonAttribut.SPECIAL_ATTACK,
                PokemonAttribut.SPECIAL_DEFENSE,
                PokemonAttribut.SPEED
            ]);
            this.saveRegisteredSetNames(setNames);
        }
    }

    public static saveSetName(setName: PokemonAttribut<any>[]): void {
        localStorage.setItem(this.POKEGUESS_SETNAME_KEY, JSON.stringify(setName.map(attribut => attribut.id)));
    }
    public static getSetName(): PokemonAttribut<any>[] {
        const data = localStorage.getItem(this.POKEGUESS_SETNAME_KEY);
        return data ? JSON.parse(data).map((id: any) => PokemonAttribut.fromId(id)) : PokemonAttribut.baseValue();
    }

    public static saveRegisteredSetNames(setNames: Map<string, PokemonAttribut<any>[]>): void {
        const setNamesToSave: Map<string, string[]> = new Map();
        setNames.forEach((attributs, name) => {
            setNamesToSave.set(name, attributs.map(attribut => attribut.id));
        });
        localStorage.setItem(this.POKEGUESS_SETSNAMES_REGISTERED_KEY, JSON.stringify(Object.fromEntries(setNamesToSave)));
    }

    public static saveSetNameWithName(setName: string, attributs: PokemonAttribut<any>[]): boolean {
        const registeredSetNames = this.getRegisteredSetNames();
        if (registeredSetNames.has(setName)) {
            return false;
        }
        registeredSetNames.set(setName, attributs);
        this.saveRegisteredSetNames(registeredSetNames);
        return true;
    }

    public static deleteSetName(setName: string): void {
        const registeredSetNames = this.getRegisteredSetNames();
        registeredSetNames.delete(setName);
        this.saveRegisteredSetNames(registeredSetNames);
    }

    public static getRegisteredSetNames(): Map<string, PokemonAttribut<any>[]> {
        const data = localStorage.getItem(this.POKEGUESS_SETSNAMES_REGISTERED_KEY);
        const result: Map<string, PokemonAttribut<any>[]> = new Map();
        if (data) {
            const parsedData: Map<string, string[]> = new Map(Object.entries(JSON.parse(data)));
            parsedData.forEach((ids, name) => {
                result.set(name, ids.map(id => PokemonAttribut.fromId(id)!));
            });
        }
        return result;
    }
}