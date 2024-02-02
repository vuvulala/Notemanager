<script lang="ts">
    import * as PDFJS from "pdfjs-dist";
    import type { Configuration } from "print-js";
    let printjs: (configuration: Configuration) => void;
    onMount(async () => {
        const module = await import("print-js");
        printjs = module.default;
    });

    import { onMount } from "svelte";
    export let path: string = "";
    export let pages: number[] = [1];
    let canvas: HTMLCanvasElement;

    let page_index = 0;

    PDFJS.GlobalWorkerOptions.workerSrc = "deps/pdfjs/pdf.worker.mjs";
    let pdf: PDFJS.PDFDocumentProxy;
    async function render_page() {
        const page = await pdf.getPage(pages[page_index]);

        const scale = 1;

        const viewport = page.getViewport({ scale });

        const context = canvas.getContext("2d");

        if (context === null) {
            alert(`Kunne ikke fange kontekst i ${__filename}`);
            return;
        }

        canvas.height = viewport.height;

        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,

            viewport: viewport,
        };

        await page.render(renderContext).promise;
    }

    async function loadPDF() {
        console.log("Loading", path);
        const loadingTask = PDFJS.getDocument(path);

        pdf = await loadingTask.promise;

        await render_page();
    }

    async function downloadPDF() {
        const images = [];

        const _canvas = document.createElement("canvas");
        const _context = _canvas.getContext("2d") as CanvasRenderingContext2D;

        for (let pagenr of pages) {
            const page = await pdf.getPage(pagenr);

            const viewport = page.getViewport({ scale: 4 });

            _canvas.height = viewport.height;

            _canvas.width = viewport.width;

            await page.render({
                canvasContext: _context,
                viewport: viewport,
            }).promise;

            images.push(_canvas.toDataURL());
        }

        printjs({
            printable: images,
            type: "image",
            imageStyle: "width:100%; margin:0; padding:0;",
        });
    }
    $: if (path) loadPDF();
    $: if (pages) {
        console.log("changed2", path);
        page_index = 0;
        if (pdf) {
            render_page();
        }
    }

    onMount(() => {
        loadPDF();
    });
</script>

<div class="grid">
    <div class="topnav">
        <button
            on:click={() => {
                if (page_index > 0) {
                    page_index = page_index - 1;
                    render_page();
                }
            }}>Forrige</button
        >

        <button on:click={downloadPDF}>SKRIV UT</button>

        <button
            on:click={() => {
                if (page_index < pages.length - 1) {
                    page_index = page_index + 1;
                    render_page();
                }
            }}>Neste</button
        >
    </div>
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .grid {
        display: grid;
        grid-template-rows: 30px auto;
        grid-template-columns: auto;

        justify-items: center;

        border-style: solid;
        height: 100%;
    }

    .topnav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
