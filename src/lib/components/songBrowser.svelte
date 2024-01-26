<script lang="ts">
  import { generateFolders, type Config } from "$lib";
  import Folder from "./songFolder.svelte";
  import SectionWrapper from "./sectionWrapper.svelte";

    export let configs: { "configs": Config[] }
    export let selected: Config

    let tree = generateFolders(configs["configs"])
</script>

<SectionWrapper title="Sang">
    <Folder bind:configs={configs["configs"]} bind:selected={selected} hide_top></Folder>
</SectionWrapper>