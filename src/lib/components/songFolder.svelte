<script lang="ts">
    import FolderButton from "./FolderButton.svelte";
    import type { Config, TreeFolder } from "$lib";

    export let tree: TreeFolder;

    export let current: TreeFolder = tree;
    $: {
        current = tree;
    }
    console.log("tree", tree);

    export let selected: Config;
</script>

<div class={`main_wrapper`}>
    {#if current.parent !== null}
        <FolderButton
            on:click={() => {
                if (current.parent !== null) current = current.parent;
            }}
            icon="icons/folder.svg"
            name="..."
        ></FolderButton>
    {/if}
    {#each Object.keys(current.folders).toSorted() as folder_name}
        <FolderButton
            on:click={() => (current = current.folders[folder_name])}
            icon="icons/folder.svg"
            name={folder_name}
        ></FolderButton>
    {/each}
    {#each Object.keys(current.files).toSorted() as file_name}
        <FolderButton
            on:click={() => {
                selected = current.files[file_name];
            }}
            icon="icons/music.svg"
            name={file_name}
        />
    {/each}
</div>

<style>
    .button_wrapper {
        height: 75px;
        display: flex;
        align-items: center;
    }

    .main_wrapper {
        padding-left: 20px;
        border-style: solid;
        border-width: 1px;
    }

    .line {
        width: 100%;
        height: 0px;
        border-style: solid;
        border-width: 1px;
    }

    .closed {
        display: none;
    }
</style>
