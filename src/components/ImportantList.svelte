<!-- src/components/ImportantList.svelte -->
<script lang="ts">
  import { findImportants } from '$lib/importantAnalyzer.js';

  export let cssText: string = '';
  export let show: boolean = false;

  $: importants = show ? findImportants(cssText) : [];
</script>

{#if show && importants.length > 0}
  <div class="mt-4">
    <h5 class="text-danger">!important usage ({importants.length})</h5>
    <div class="row row-cols-1 row-cols-md-2 g-3">
      {#each importants as imp}
        <div class="col">
          <div class="card border-danger">
            <div class="card-body py-2">
              <code class="small d-block text-danger">{imp.declaration}</code>
              <small class="text-muted">Line {imp.line}</small>
              <span class={`badge ms-2 ${imp.risk === 'Low' ? 'bg-success' : 'bg-danger'}`}>
                {imp.risk} risk
              </span>
              <p class="mt-2 mb-0 small">{imp.suggestion}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}