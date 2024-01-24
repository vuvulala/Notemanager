<script lang="ts">
    import * as PDFJS from "pdfjs-dist";
    export let path: string = ""
    export let pages: number[] = [1]
    let canvas: HTMLCanvasElement

    let page_index = 0

    PDFJS.GlobalWorkerOptions.workerSrc = "pdfjs/pdf.worker.mjs"
    let pdf: PDFJS.PDFDocumentProxy
    async function render_page() {
        const page = await pdf.getPage(pages[page_index]);

        const scale = 1;

        const viewport = page.getViewport({ scale, });

        const context = canvas.getContext("2d");

        canvas.height = viewport.height;

        canvas.width = viewport.width;

        const renderContext = {

            canvasContext: context,

            viewport: viewport,

        };

        await page.render(renderContext);
    }

    async function loadPDF(node) {

        const loadingTask = PDFJS.getDocument(path);

        pdf = await loadingTask.promise;

        //await render_page()
    }

    $: if(pages) {
        console.log("changed2", path)
        page_index = 0
        if(pdf) {
            render_page()
        }
    }
</script>
<div>
<button on:click={() => {
    if(page_index > 0) {
        page_index = page_index - 1
        render_page()
    }
    
}}>Forrige</button>

<button on:click={() => {
    if(page_index < pages.length - 1) {
        page_index = page_index + 1
        render_page()
    }
    
}}>Neste</button>

<button on:click={() => {
    console.log(canvas)
    const doc = `
    <!DOCTYPE html>
    <html>
        <head><title>print</title></head>
        <body>
            <img src="${canvas.toDataURL()}"></img>
        </body>
    </html>
    `
    const printWindow = window.open("", "")
    printWindow?.document.open()
    printWindow?.document.write(doc)
    printWindow?.document.close()
    printWindow?.print()
    printWindow?.close()

}}>SKRIV UT</button>

<canvas use:loadPDF="{path}" bind:this={canvas}></canvas>
</div>