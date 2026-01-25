import type { VercelRequest } from "@vercel/node";
import { prisma, selectPokemonDetails } from "../_lib/prisma.js";
import type { ApiContract } from "../../shared/api-contract.js";
import { ApiRoutes } from "../../shared/api-routes.js";
import { TypedVercelResponse } from "../_lib/custom-vercel-response.js";

type Response = ApiContract[typeof ApiRoutes.pokemonById]["response"];

export default async function handler(
    req: VercelRequest,
    res: TypedVercelResponse<Response>
) {
    const pokemonId = parseInt(req.query.pokemonId as string);
    const pokemon = await prisma.pokemon.findUnique({
        where: { id: pokemonId },
        select: selectPokemonDetails
    });
    if (pokemon === null) {
        res.status(404);
    } else {
        res.status(200).json(pokemon);
    }
}
