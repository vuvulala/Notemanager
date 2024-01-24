import { readFileSync, readdirSync } from "fs";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import type { Config } from "$lib";



export const GET: RequestHandler = () => {
    const dir = readdirSync("static/config", { recursive: true })

    const filtered = dir.filter((v) => (v as string).endsWith(".json"))

    const contents = filtered.map((value) => (JSON.parse(readFileSync("static/config/" + value).toString()) as Config))

    return json({ "configs": contents });
}
