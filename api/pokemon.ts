import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ApiContract } from "../shared/api-contract.js";
import { ApiRoutes } from "../shared/api-routes.js";
import { prisma, selectPokemonDetails } from "./_lib/prisma.js";

type Response = ApiContract[typeof ApiRoutes.pokemonById]["response"];

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    const pokemon = await prisma.pokemon.findMany({
        where: { is_default: true },
        select: selectPokemonDetails
    });
    res.status(200).json(pokemon);
}
