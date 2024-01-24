// place files you want to import through the `$lib` alias in this folder.
export type Config = {
    name: string,
    category: string,
    parts: {
        [instrument: string]: {
            [part: string]: {
                pages: number[],
                path: string
            }
        }
    }
}