<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name: string = "...";
    export let icon: string = "icons/folder.svg";

    const dispatcher = createEventDispatcher();

    function callDispatcher(e) {
        dispatcher("click", {});
    }
</script>

<div class="button_wrapper">
    <button on:click={callDispatcher}>
        <img src={icon} width="17px" alt="folder" />
        {name}
    </button>
</div>

<style>
    .button_wrapper {
        height: 75px;
        display: flex;
        align-items: center;
    }

    .button_wrapper button {
        height: 50px;
    }
</style>
