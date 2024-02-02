<script lang="ts">
  import type { Config } from "$lib";
  import Folder from "./songFolder.svelte";
  import SectionWrapper from "./sectionWrapper.svelte";

  export let configs: { configs: Config[] };

  export let selected: Config;
</script>

<SectionWrapper title="Sang">
  <Folder bind:configs={configs["configs"]} bind:selected hide_top></Folder>
</SectionWrapper>
