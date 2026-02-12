import { DateStringabble, Stringabble } from "../../components/utils/Stringabble";
import { Attribut, AttributColumn } from "../Attribut";
import { Champion } from "./Champion";

export class ChampionAttribut<T extends Stringabble> extends Attribut<T, Champion> {

    static readonly ROLE = new ChampionAttribut<string>(
        "Rôle",
        [{ label: "Rôle", value: (champion: Champion) => champion.role }]
    );
    static readonly BE_PRICE = new ChampionAttribut<number>(
        "Prix en BE",
        [{ label: "Prix en BE", value: (champion: Champion) => champion.bePrice }]
    );
    static readonly RP_PRICE = new ChampionAttribut<number>(
        "Prix en RP",
        [{ label: "Prix en RP", value: (champion: Champion) => champion.rpPrice }]
    );
    static readonly STYLE = new ChampionAttribut<number>(
        "Style",
        [{ label: "Style", value: (champion: Champion) => champion.style }]
    );
    static readonly DIFFICULTY = new ChampionAttribut<number>(
        "Difficulté",
        [{ label: "Difficulté", value: (champion: Champion) => champion.difficulty }]
    );
    static readonly RELEASE_DATE = new ChampionAttribut<DateStringabble>(
        "Date de sortie",
        [{ label: "Date de sortie", value: (champion: Champion) => DateStringabble.withDayMonthYear(champion.releaseDate), withArrow: true }]
    );
    static readonly LAST_CHANGED = new ChampionAttribut<string>(
        "Dernier changement",
        [{ label: "Dernier changement", value: (champion: Champion) => champion.lastChanged }]
    );
    static readonly CLASS = new ChampionAttribut<string[]>(
        "Classe",
        [{ label: "Classe", value: (champion: Champion) => champion.class }]
    );
    static readonly LEGACY_CLASSES = new ChampionAttribut<string[]>(
        "Anciennes classes",
        [{ label: "Anciennes classes", value: (champion: Champion) => champion.legacyClasses }]
    );
    static readonly RESOURCE = new ChampionAttribut<string>(
        "Ressource",
        [{ label: "Ressource", value: (champion: Champion) => champion.resource }]
    );
    static readonly RANGE_TYPE = new ChampionAttribut<string>(
        "Type de portée",
        [{ label: "Type de portée", value: (champion: Champion) => champion.rangeType }]
    );
    static readonly ADAPTIVE_TYPE = new ChampionAttribut<string>(
        "Type adaptatif",
        [{ label: "Type adaptatif", value: (champion: Champion) => champion.adaptiveType }]
    );
    static readonly HP = new ChampionAttribut<number>(
        "PV",
        [{ label: "PV", value: (champion: Champion) => champion.stats.hp }]
    );
    static readonly HP5 = new ChampionAttribut<number>(
        "PV/5s",
        [{ label: "PV/5s", value: (champion: Champion) => champion.stats.hp5 }]
    );
    static readonly AR = new ChampionAttribut<number>(
        "Armure",
        [{ label: "Armure", value: (champion: Champion) => champion.stats.ar }]
    );
    static readonly AD = new ChampionAttribut<number>(
        "AD",
        [{ label: "AD", value: (champion: Champion) => champion.stats.ad }]
    );
    static readonly MR = new ChampionAttribut<number>(
        "MR",
        [{ label: "MR", value: (champion: Champion) => champion.stats.mr }]
    );
    static readonly CRIT_DMG = new ChampionAttribut<number>(
        "Dégâts critiques",
        [{ label: "Dégâts critiques", value: (champion: Champion) => champion.stats.critDmg }]
    );
    static readonly MS = new ChampionAttribut<number>(
        "MS",
        [{ label: "MS", value: (champion: Champion) => champion.stats.ms }]
    );
    static readonly ATTACK_RANGE = new ChampionAttribut<number>(
        "Portée d'attaque",
        [{ label: "Portée d'attaque", value: (champion: Champion) => champion.stats.attackRange }]
    );
    static readonly BASE_AS = new ChampionAttribut<number>(
        "AS de base",
        [{ label: "AS de base", value: (champion: Champion) => champion.stats.baseAs }]
    );
    static readonly WINDUP_PERCENT = new ChampionAttribut<number>(
        "Windup%",
        [{ label: "Windup%", value: (champion: Champion) => champion.stats.windupPercent }]
    );
    static readonly AS_RATIO = new ChampionAttribut<number>(
        "AS ratio",
        [{ label: "AS ratio", value: (champion: Champion) => champion.stats.asRatio }]
    );
    static readonly BONUS_AS = new ChampionAttribut<number>(
        "Bonus AS",
        [{ label: "Bonus AS", value: (champion: Champion) => champion.stats.bonusAs }]
    );
    static readonly GAMEPLAY_RADIUS = new ChampionAttribut<number>(
        "Rayon de gameplay",
        [{ label: "Rayon de gameplay", value: (champion: Champion) => champion.stats.gameplayRadius }]
    );
    static readonly SELECTION_RADIUS = new ChampionAttribut<number>(
        "Rayon de sélection",
        [{ label: "Rayon de sélection", value: (champion: Champion) => champion.stats.selectionRadius }]
    );
    static readonly PATHING_RADIUS = new ChampionAttribut<number>(
        "Rayon de pathing",
        [{ label: "Rayon de pathing", value: (champion: Champion) => champion.stats.pathingRadius }]
    );
    static readonly SELECTION_HEIGHT = new ChampionAttribut<number>(
        "Hauteur de sélection",
        [{ label: "Hauteur de sélection", value: (champion: Champion) => champion.stats.selectionHeight }]
    );
    static readonly ACQUISITION_RADIUS = new ChampionAttribut<number>(
        "Rayon d'acquisition",
        [{ label: "Rayon d'acquisition", value: (champion: Champion) => champion.stats.acquisitionRadius }]
    );

    private constructor(
        public readonly id: string,
        public readonly columns: AttributColumn<T, Champion>[]
    ) { super(id, columns); }

    public static fromId(id: string): ChampionAttribut<Stringabble> | undefined {
        return this.values().find((attribut) => attribut.id === id);
    }

    public static baseValue(): ChampionAttribut<Stringabble>[] {
        return [
            ChampionAttribut.ROLE,
            ChampionAttribut.BE_PRICE,
            ChampionAttribut.RP_PRICE,
            ChampionAttribut.STYLE,
            ChampionAttribut.DIFFICULTY,
            ChampionAttribut.RELEASE_DATE,
            ChampionAttribut.LAST_CHANGED,
            ChampionAttribut.CLASS,
            ChampionAttribut.LEGACY_CLASSES,
            ChampionAttribut.RESOURCE,
            ChampionAttribut.RANGE_TYPE,
            ChampionAttribut.ADAPTIVE_TYPE
        ]
    }

    public static values(): ChampionAttribut<Stringabble>[] {
        return [
            ChampionAttribut.ROLE,
            ChampionAttribut.BE_PRICE,
            ChampionAttribut.RP_PRICE,
            ChampionAttribut.STYLE,
            ChampionAttribut.DIFFICULTY,
            ChampionAttribut.RELEASE_DATE,
            ChampionAttribut.LAST_CHANGED,
            ChampionAttribut.CLASS,
            ChampionAttribut.LEGACY_CLASSES,
            ChampionAttribut.RESOURCE,
            ChampionAttribut.RANGE_TYPE,
            ChampionAttribut.ADAPTIVE_TYPE,
            ChampionAttribut.HP,
            ChampionAttribut.HP5,
            ChampionAttribut.AR,
            ChampionAttribut.AD,
            ChampionAttribut.MR,
            ChampionAttribut.CRIT_DMG,
            ChampionAttribut.MS,
            ChampionAttribut.ATTACK_RANGE,
            ChampionAttribut.BASE_AS,
            ChampionAttribut.WINDUP_PERCENT,
            ChampionAttribut.AS_RATIO,
            ChampionAttribut.BONUS_AS,
            ChampionAttribut.GAMEPLAY_RADIUS,
            ChampionAttribut.SELECTION_RADIUS,
            ChampionAttribut.PATHING_RADIUS,
            ChampionAttribut.SELECTION_HEIGHT,
            ChampionAttribut.ACQUISITION_RADIUS
        ];
    }

}