<script lang="ts">
  import type { Config } from "$lib";

    export let config: Config

    export let pages: number[] = []
    export let path = ""

    $: console.log("inst", config)

    $: select_part(Object.keys(config.parts)[0], Object.keys(config.parts[Object.keys(config.parts)[0]])[0])

    const select_part = (inst: string, part: string) => {
        const selected_part = config.parts[inst][part]
        path = selected_part.path
        pages = selected_part.pages

        console.log(selected_part)
        console.log("select", pages, path)
    }
</script>

<div class="top">
    <h1>Stemmer</h1>
    {#each Object.keys(config.parts).toSorted() as instrument_name}
    <div class="instrument">
        <span>
            {instrument_name}
        </span>
        <div class="part_list">
            {#each Object.keys(config.parts[instrument_name]) as part_name}
                <div class="part">
                    <button on:click={() => {select_part(instrument_name, part_name)}} class="part_button">
                    {part_name}
                    </button>
                </div>
            {/each}
        </div>
    </div>
    {/each}
</div>

<style >
    .top h1 {
        display: flex;
        align-self: center;
    }
    .top {
        display: flex;
        flex-direction: column;
        border-style: solid;
        height: 100%;
    }

    .top > div:nth-of-type(odd) {
        background: #eeeeee;
    }

    .top > div:nth-of-type(even) {
        background: #cccccc;
    }

    .instrument {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 1em;
        padding-right: 3em;
    }

    .instrument span {
        font-size: 2em;
        align-self: center;
    }

    .part_list {
        align-self: center;
        display: flex;
    }

    .part_button {
        width: 3em;
        height: 3em;
    }
</style>