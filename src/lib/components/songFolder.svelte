<script lang="ts">
    import FolderButton from "./FolderButton.svelte";
    import type { Config, TreeFolder } from "$lib";

    export let tree: TreeFolder;

    let selected_node: TreeFolder = tree;
    $: {
        selected_node = tree;
    }
    console.log("tree", tree);

    export let selected: Config;
</script>

<div class={`main_wrapper`}>
    {#if selected_node.parent !== null}
        <FolderButton
            on:click={() => {
                if (selected_node.parent !== null)
                    selected_node = selected_node.parent;
            }}
            icon="icons/folder.svg"
            name="..."
        ></FolderButton>
    {/if}
    {#each Object.keys(selected_node.folders).toSorted() as folder_name}
        <FolderButton
            on:click={() =>
                (selected_node = selected_node.folders[folder_name])}
            icon="icons/folder.svg"
            name={folder_name}
        ></FolderButton>
    {/each}
    {#each Object.keys(selected_node.files).toSorted() as file_name}
        <FolderButton
            on:click={() => {
                selected = selected_node.files[file_name];
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
