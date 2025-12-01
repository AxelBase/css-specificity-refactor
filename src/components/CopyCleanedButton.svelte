<!-- src/components/CopyCleanedButton.svelte -->
<script lang="ts">
  import { copyToClipboard } from '$lib/utils.js';

  export let cleanedCss: string = '';

  async function copyAll() {
    const success = await copyToClipboard(cleanedCss);
    if (success) alert('Full cleaned CSS copied to clipboard!');
  }
</script>

<button class="btn btn-success btn-lg mt-3" on:click={copyAll} disabled={!cleanedCss}>
  Copy Cleaned CSS ({(cleanedCss.length / 1024).toFixed(1)} KB)
</button>