<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  export let data: PageData;
  import * as pdfjs from "pdfjs-dist";

  pdfjs.GlobalWorkerOptions.workerSrc = "libs/pdfjs/build/pdf.worker.mjs";
  var canvas: HTMLCanvasElement;
  var context: CanvasRenderingContext2D;
  onMount(() => {
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    load_document("pdfs/Priser.pdf");
  });

  const load_document = (path: string) => {
    const loader = pdfjs.getDocument(path);
    loader.promise.then(async (doc) => {
      console.log(doc);

      const page = await doc.getPage(1);
      console.log(page);
      const viewport = page.getViewport({ scale: 1 });

      console.log(viewport);

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";

      var renderContext = {
        canvasContext: context,
        transform: [1, 0, 0, 1, 0, 0],
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  const render_page = () => {};

  console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<canvas bind:this={canvas}></canvas>
