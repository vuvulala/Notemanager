<script lang="ts">
    export let title: string = "Untitled"
</script>

<div class="top">
    <h1>{title}</h1>
    <slot/>
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