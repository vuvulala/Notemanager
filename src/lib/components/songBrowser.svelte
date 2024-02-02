<script lang="ts">
  import type { Config, TreeFolder } from "$lib";
  import { generateFolders } from "$lib";
  import Folder from "./songFolder.svelte";
  import SectionWrapper from "./sectionWrapper.svelte";

  export let configs: Config[];

  export let selected: Config;

  let tree: TreeFolder = { files: {}, folders: {}, parent: null };
  $: {
    tree = generateFolders(configs);
  }
</script>

<SectionWrapper title="Sang">
  <Folder {tree} bind:selected></Folder>
</SectionWrapper>
