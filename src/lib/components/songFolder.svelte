<script lang="ts">
  import type { Config } from "$lib";

  export let hide_top: boolean = false;
    export let configs: Config[]

    export let selected: Config

    export let name: string = ""

    let is_open: boolean = false

    let folders: {[key: string]: Config[] } = {}
    let files: {[key: string]: Config} = {}

    for(let conf of configs) {
        if(conf.category === "") {
            files[conf.name] = conf
            continue
        }
        let obj: Config = JSON.parse(JSON.stringify(conf))
        const split_cat = obj.category.split("/")
        obj.category = split_cat.slice(1).join("/")

        const folder_name = split_cat[0]
        if(folders[folder_name] === undefined) {folders[folder_name] = []}
        folders[split_cat[0]].push(obj)
    }

    console.log("configs folders", folders)
    console.log("configs files", files)
</script>

{#if !hide_top}
<div class="button_wrapper">
    <button on:click={() => is_open = !is_open}>
        <img src="icons/folder.svg" width="17px" alt="folder"> {name}
    </button>
</div>
{/if}
<div class={`main_wrapper ${is_open || hide_top ? 'open' : 'closed'}`}>
    <div class="folder_wrapper">
    {#each Object.keys(folders).toSorted() as folder_name}
        <div class="folder">
            <svelte:self configs={folders[folder_name]} name={folder_name} bind:selected={selected}></svelte:self>
        </div>
    {/each}
    </div>
<div class="line"/>
    {#each Object.keys(files).toSorted() as file_name}
    <div class="button_wrapper">
        <button on:click={() => {selected = files[file_name]}}>
            <img src="icons/music.svg" width="17px" alt="note"> {file_name}
        </button>
    </div>
    {/each}
</div>
<style>

    .button_wrapper {
        height: 75px;
        display: flex;
        align-items: center;
    }

    .button_wrapper button {
        height: 50px;
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