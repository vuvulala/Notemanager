<script lang="ts">
  import type { Config } from "$lib";
  import SectionWrapper from "./sectionWrapper.svelte";

    export let config: Config

    export let pages: number[] = []
    export let path = ""

    $: console.log("inst", config)

    //$: select_part(Object.keys(config.parts)[0], Object.keys(config.parts[Object.keys(config.parts)[0]])[0])

    const select_part = (inst: string, part: string) => {
        const selected_part = config.parts[inst][part]
        path = selected_part.path
        pages = selected_part.pages

        console.log(selected_part)
        console.log("select", pages, path)
    }
</script>

<SectionWrapper title="Stemmer">
    <div class="instrument_list">
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
</SectionWrapper>

<style >
    .instrument_list > div:nth-of-type(odd) {
        background: #eeeeee;
    }

    .instrument_list > div:nth-of-type(even) {
        background: #cccccc;
    }

    .instrument {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 1em;
        padding-right: 2em;
        height: 75px;
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
        width: 50px;
        height: 50px;
        font-size: 2em;
        text-align: center;
        margin-left: 10px;
    }
</style>