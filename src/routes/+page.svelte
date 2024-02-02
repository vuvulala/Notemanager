<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    import PartBrowser from "$lib/components/songBrowser.svelte";
    import type { Config } from "$lib";
    import PdfBrowser from "$lib/components/pdfBrowser.svelte";
    import { GlobalWorkerOptions } from "pdfjs-dist";
    import InstrumentBrowser from "$lib/components/instrumentBrowser.svelte";

    console.log(data);

    let selected: Config = data["configs"][0];

    $: console.log("selected", selected);

    let pages: number[] = [];
    let path = "";
</script>

<div class="TOP">
    <div>
        <PartBrowser bind:configs={data["configs"]} bind:selected />
    </div>
    <div>
        <InstrumentBrowser config={selected} bind:pages bind:path
        ></InstrumentBrowser>
    </div>
    <div>
        <PdfBrowser bind:pages bind:path></PdfBrowser>
    </div>
</div>

<style>
    .TOP {
        display: grid;
        grid-template-columns: 25% 25% auto;
        height: 100%;
    }
</style>
