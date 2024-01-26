import type { Config } from "$lib";
import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ fetch }) => {
    const a = await fetch("/config");
    return (await a.json()) as { "configs": Config[] };
};
