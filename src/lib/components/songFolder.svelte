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
<button on:click={() => is_open = !is_open}> <img src="icons/folder.svg" width="17px" alt="folder"> {name}</button>
{/if}
<div class={`main_wrapper ${is_open || hide_top ? 'open' : 'closed'}`}>
    {#each Object.keys(folders) as folder_name}
        <div class="folder">
            <svelte:self configs={folders[folder_name]} name={folder_name} bind:selected={selected}></svelte:self>
        </div>
    {/each}

    {#each Object.keys(files) as file_name}
        <button on:click={() => {selected = files[file_name]}}> {file_name}</button>
    {/each}
</div>
<style>


    .main_wrapper {
        padding-left: 20px;
    }

    .closed {
        display: none;
    }
</style>