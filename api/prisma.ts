import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = "file:./prisma/pokedex.sqlite";

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

const selectPokemonDetails = {
        id: true,
        pokemon_species: {
            select: {
                id: true,
                generations: true,
                pokemon_habitats: true,
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