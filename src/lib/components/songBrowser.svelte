<script lang="ts">
  import type { Config, TreeFolder } from "$lib";
  import { generateFolders } from "$lib";
  import Folder from "./songFolder.svelte";
  import SectionWrapper from "./sectionWrapper.svelte";

  export let configs: Config[];

  export let selected: Config;
  let current: TreeFolder = {
    files: {},
    folders: {},
    parent: null,
    category_name: "",
  };

  let tree: TreeFolder = {
    files: {},
    folders: {},
    parent: null,
    category_name: "",
  };
  $: {
    tree = generateFolders(configs);
  }
</script>

<SectionWrapper title={`sanger / ${current.category_name}`}>
  <Folder {tree} bind:selected bind:current></Folder>
</SectionWrapper>
