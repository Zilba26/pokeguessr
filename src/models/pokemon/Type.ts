export enum Type {
    Acier = "Acier",
    Combat = "Combat",
    Dragon = "Dragon",
    Eau = "Eau",
    Electrik = "Electrik",
    Fee = "Fee",
    Feu = "Feu",
    Glace = "Glace",
    Insecte = "Insecte",
    Normal = "Normal",
    Plante = "Plante",
    Poison = "Poison",
    Psy = "Psy",
    Roche = "Roche",
    Sol = "Sol",
    Spectre = "Spectre",
    Tenebres = "Ténèbres",
    Vol = "Vol",

}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Type {
    export function getImage(type: Type): string {
        return "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/" + type + ".png";
    }

    export function getTypeByName(type: string) {
        switch (type.toLowerCase().replace("é", "e").replace("è", "e")) {
            case "acier":
                return Type.Acier;
            case "combat":
                return Type.Combat;
            case "dragon":
                return Type.Dragon;
            case "eau":
                return Type.Eau;
            case "electrik":
                return Type.Electrik;
            case "fee":
                return Type.Fee;
            case "feu":
                return Type.Feu;
            case "glace":
                return Type.Glace;
            case "insecte":
                return Type.Insecte;
            case "normal":
                return Type.Normal;
            case "plante":
                return Type.Plante;
            case "poison":
                return Type.Poison;
            case "psy":
                return Type.Psy;
            case "roche":
                return Type.Roche;
            case "sol":
                return Type.Sol;
            case "spectre":
                return Type.Spectre;
            case "tenebres":
                return Type.Tenebres;
            case "vol":
                return Type.Vol;
            default:
                return null;
        }
    }
}