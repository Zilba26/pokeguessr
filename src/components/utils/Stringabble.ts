export type Stringabble = string | number | Record<string, string> | DateStringabble | Stringabble[];

export function stringabbleToString(value: Stringabble): string {
    if (Array.isArray(value)) {
        return value.map(v => stringabbleToString(v)).join(",\n");
    } else if (typeof value === "number") {
        if (value >= 1_000_000_000) {
            return (value / 1_000_000_000).toFixed(0) + " Md";
        } else if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(0) + " M";
        } else {
            return value.toString();
        }
    } else {
        return value.toString();
    }
}

export class DateStringabble {
    private date: Date;
    private format: Intl.DateTimeFormat

    private constructor(date: Date, format: Intl.DateTimeFormat) {
        this.date = date;
        this.format = format;
    }

    public static withYear(date: Date): DateStringabble {
        return new DateStringabble(date, Intl.DateTimeFormat('fr-FR', { year: 'numeric' }));
    }

    public static withMonthYear(date: Date): DateStringabble {
        return new DateStringabble(date, Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }));
    }

    public static withDayMonthYear(date: Date): DateStringabble {
        return new DateStringabble(date, Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }));
    }

    public static withDayMonth(date: Date): DateStringabble {
        return new DateStringabble(date, Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }));
    }

    public static withHour(date: Date): DateStringabble {
        return new DateStringabble(date, Intl.DateTimeFormat('fr-FR', { hour: 'numeric', minute: 'numeric' }));
    }

    public toString(): string {
        return this.format.format(this.date);
    }
}