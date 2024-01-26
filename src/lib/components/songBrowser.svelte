<script lang="ts">
  import type { Config } from "$lib";
  import Folder from "./folder.svelte";

export let configs: { "configs": Config[] }

export let selected: Config
</script>

<div class="top">
    <h1>Sang</h1>
    <Folder bind:configs={configs["configs"]} bind:selected={selected}></Folder>
</div>

<style>
    .top {
        border-style: solid;
        height: 100%;
    }
</style>