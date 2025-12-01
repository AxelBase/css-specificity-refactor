<!-- src/components/SuggestionPanel.svelte -->
<script lang="ts">
  import { generateSuggestions } from '$lib/suggester.js';
  import { copyToClipboard } from '$lib/utils.js';

  export let selector: string = '';

  $: suggestions = generateSuggestions(selector);
</script>

{#if suggestions.length > 0}
  <div class="mt-3">
    <h6 class="text-primary mb-2">Suggestions to reduce specificity</h6>
    {#each suggestions as sug}
      <div class="card mb-2">
        <div class="card-body py-2 px-3">
          <div class="d-flex justify-content-between align-items-center">
            <code class="small text-success me-3">{sug.selector}</code>
            <div class="text-end">
              <span class="badge bg-secondary me-2">
                {sug.specificity.toString()}
              </span>
              <span class={`badge ${sug.risk === 'Safe' ? 'bg-success' : 'bg-warning'}`}>
                {sug.risk}
              </span>
            </div>
          </div>
          <small class="text-muted d-block mt-1">{sug.reason}</small>
          <button
            class="btn btn-sm btn-outline-primary mt-2"
            on:click={() => copyToClipboard(sug.selector)}>
            Copy selector
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}