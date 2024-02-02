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

export type TreeFolder = {
    folders: { [key: string]: TreeFolder };
    files: { [key: string]: Config };
    parent: TreeFolder | null;
};

export const generateFolders = (configs: Config[]) => {
    let result: TreeFolder = { folders: {}, files: {}, parent: null };

    for (let song of configs) {
        let path = song.category.split("/");
        let obj = result;
        for (let step of path) {
            if (obj.folders[step] === undefined) {
                obj.folders[step] = { files: {}, folders: {}, parent: obj };
            }
            obj = obj.folders[step];
        }
        obj.files[song.name] = song;
    }

    return result;
};