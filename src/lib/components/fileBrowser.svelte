<script lang="ts">
  import type { Config } from "$lib";
  import Folder from "./folder.svelte";

export let configs: { "configs": Config[] }

export let selected: Config
</script>

<div>
<Folder bind:configs={configs["configs"]} bind:selected={selected}></Folder>
</div>

<style>

</style>