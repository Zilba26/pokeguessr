import { Stringabble } from "../../components/utils/Stringabble";
import { Attribut, AttributColumn } from "../Attribut";
import { OnePieceCharacter } from "./OnePieceCharacter";

export class OnePieceAttribut<T extends Stringabble> extends Attribut<T, OnePieceCharacter> {

    static readonly SIZE = new OnePieceAttribut<number>(
        "Taille",
        [{ label: "Taille (cm)", value: (character: OnePieceCharacter) => character.size }]
    );
    static readonly AGE = new OnePieceAttribut<number>(
        "Âge",
        [{ label: "Âge", value: (character: OnePieceCharacter) => character.age }]
    );
    static readonly BOUNTY = new OnePieceAttribut<number>(
        "Prime",
        [{ label: "Prime", value: (character: OnePieceCharacter) => character.bounty }]
    );
    static readonly CREW = new OnePieceAttribut<string>(
        "Équipage",
        [{ label: "Équipage", value: (character: OnePieceCharacter) => character.crew }]
    );
    static readonly DEVIL_FRUIT = new OnePieceAttribut<string>(
        "Fruit du démon",
        [{ label: "Fruit du démon", value: (character: OnePieceCharacter) => character.devilFruit }]
    );
    static readonly JOB = new OnePieceAttribut<string>(
        "Métier",
        [{ label: "Métier", value: (character: OnePieceCharacter) => character.job }]
    );
    static readonly STATUS = new OnePieceAttribut<string>(
        "Statut",
        [{ label: "Statut", value: (character: OnePieceCharacter) => character.status }]
    );

    private constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<T, OnePieceCharacter>[]
    ) {super(id, columns);}

    public static fromId(id: string): OnePieceAttribut<Stringabble> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    public static baseValue(): OnePieceAttribut<Stringabble>[] {
        return this.values();
    }

    public static values(): OnePieceAttribut<Stringabble>[] {
        return [
            OnePieceAttribut.SIZE,
            OnePieceAttribut.AGE,
            OnePieceAttribut.BOUNTY,
            OnePieceAttribut.CREW,
            OnePieceAttribut.DEVIL_FRUIT,
            OnePieceAttribut.JOB,
            OnePieceAttribut.STATUS
        ];
    }
}