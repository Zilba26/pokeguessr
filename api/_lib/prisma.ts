import fs from "node:fs";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";
import { pokemonSelect } from "../../generated/prisma/models.js";
import { DefaultArgs } from "@prisma/client/runtime/client";

const TMP_DB_PATH = "/tmp/pokedex.sqlite";

if (!fs.existsSync(TMP_DB_PATH) && process.env.VERCEL === "1") {
    const source = path.join(process.cwd(), "prisma/pokedex.sqlite");
    fs.copyFileSync(source, TMP_DB_PATH);
}

const connectionString = process.env.VERCEL === "1" ? `file:${TMP_DB_PATH}` : "file:./prisma/pokedex.sqlite";

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

const selectPokemonDetails = {
    id: true,
    pokemon_species: {
        select: {
            id: true,
            generations: true,
            pokemon_habitats: {
                select: {
                    pokemon_habitat_names: { select: { name: true } }
                }
            },
            pokemon_colors: {
                select: {
                    pokemon_color_names: { select: { name: true } }
                }
            },
            pokemon_species_names: {
                select: {
                    name: true
                }
            },
            pre_evolution: {
                select: {
                    id: true,
                    pre_evolution: {
                        select: {
                            id: true,
                            pre_evolution: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    weight: true,
    height: true,
    pokemon_types: {
        select: {
            slot: true,
            types: {
                select: {
                    type_names: true
                }
            }
        }
    }
};

export { prisma, selectPokemonDetails };