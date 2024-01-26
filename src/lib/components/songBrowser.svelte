<script lang="ts">
  import type { Config } from "$lib";
  import Folder from "./songFolder.svelte";

export let configs: { "configs": Config[] }

export let selected: Config
</script>

<div class="top">
    <h1>Sang</h1>
    <Folder bind:configs={configs["configs"]} bind:selected={selected}></Folder>
</div>

<style>
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
</style>