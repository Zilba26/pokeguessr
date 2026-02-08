import type { VercelRequest } from "@vercel/node";
import { ApiContract } from "../shared/api-contract.js";
import { ApiRoutes } from "../shared/api-routes.js";
import { TypedVercelResponse } from "./_lib/custom-vercel-response";
import genshindb from 'genshin-db';

type Response = ApiContract[typeof ApiRoutes.allGenshinCharacters]["response"];

export default async function handler(
    req: VercelRequest,
    res: TypedVercelResponse<Response>
) {
    const characters = genshindb.characters("names", { matchCategories: true, verboseCategories: true });
    console.log(characters.find((character) => character.name === "Mavuika"));
    res.status(200).json(characters);
}
