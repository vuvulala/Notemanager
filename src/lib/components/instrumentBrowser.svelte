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
{#each Object.keys(config.parts) as instrument_name}
<div class="instrument">
    {instrument_name}
    <div class="partlist">
        {#each Object.keys(config.parts[instrument_name]) as part_name}
            <div class="part">
                <button on:click={() => {select_part(instrument_name, part_name)}}>
                {part_name}
                </button>
            </div>
        {/each}
    </div>
</div>
{/each}
</div>

<style >
    .top {
        border-style: solid;
        height: 100%;
    }
</style>