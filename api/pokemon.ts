import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ApiContract } from "../shared/api-contract.js";
import { ApiRoutes } from "../shared/api-routes.js";
import { prisma, selectPokemonDetails } from "./_lib/prisma.js";
import { TypedVercelResponse } from "./_lib/custom-vercel-response.js";

type Response = ApiContract[typeof ApiRoutes.allPokemon]["response"];

export default async function handler(
    req: VercelRequest,
    res: TypedVercelResponse<Response>
) {
    const pokemon = await prisma.pokemon.findMany({
        where: { is_default: true },
        select: selectPokemonDetails
    });
    res.status(200).json(pokemon);
}
