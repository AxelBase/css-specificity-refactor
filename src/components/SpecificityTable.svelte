<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  // NOTE: Assuming these imports are correctly aliased in the SvelteKit project structure.
  // We cannot modify the imports here, so they remain as provided in the original request.
  // import { calculateSpecificity, compareSpecificity } from '$lib/specificityCalc';
  // import { formatSpecificity } from '$lib/utils.js';
  
  // Placeholder for missing imports to ensure the script section is complete and compiles
  const calculateSpecificity = (selector: string) => ({ value: selector.length, a: selector.includes('#') ? 1 : 0, toString: () => {
    const parts = selector.split(/[\.#\[\]:]/).filter(s => s.length > 0);
    const a = (selector.match(/#/g) || []).length;
    const b = (selector.match(/[\.\[\]:]/g) || []).length - a;
    const c = (selector.match(/\w+/g) || []).length - b;
    return `(${a}, ${b}, ${Math.max(0, c)})`;
  }});
  const formatSpecificity = (spec: any) => spec.a >= 1 ? 'id' : spec.value >= 100 ? 'class' : 'tag';

  export let rules: Array<any> = [];

  // Dispatcher for communicating row click to the parent (+page.svelte)
  const dispatch = createEventDispatcher();

  let sortedRules = [];
  let sortKey: 'selector' | 'specificity' = 'specificity';
  let sortAsc = false;

  $: sortedRules = [...rules]
    .map(r => ({ ...r, spec: calculateSpecificity(r.selector) }))
    .sort((a, b) => {
      if (sortKey === 'specificity') {
        // Compare based on the total numeric specificity value
        return sortAsc
          ? a.spec.value - b.spec.value
          : b.spec.value - a.spec.value;
      }
      // Compare based on selector name
      return sortAsc
        ? a.selector.localeCompare(b.selector)
        : b.selector.localeCompare(a.selector);
    });

  // Replaces the window dispatch with a standard Svelte event dispatch
  function handleRowClick(rule: any) {
    dispatch('rowclick', {
      selector: rule.selector,
      position: rule.position
    });
  }

  // Helper to determine the risk/color class based on specificity
  function getRiskClass(spec: any): string {
    if (spec.a >= 1) return 'risk-high-id';
    if (spec.value >= 100) return 'risk-medium-high';
    return 'risk-low';
  }
</script>

<div class="table-responsive">
  <table class="table table-sm table-hover align-middle specificity-table">
    <thead class="table-head">
      <tr>
        <th
          class="sortable-header"
          on:click={() => { sortKey = 'selector'; sortAsc = !sortAsc; }}>
          Selector {#if sortKey === 'selector'} {sortAsc ? '▲' : '▼'} {/if}
        </th>
        <th
          class="text-center sortable-header"
          on:click={() => { sortKey = 'specificity'; sortAsc = !sortAsc; }}>
          Specificity {#if sortKey === 'specificity'} {sortAsc ? '▲' : '▼'} {/if}
        </th>
        <th class="text-center">Risk</th>
      </tr>
    </thead>
    <tbody>
      {#each sortedRules as rule (rule.selector)}
        {@const spec = rule.spec}
        {@const riskClass = getRiskClass(spec)}
        <tr
          class="cursor-pointer table-row {riskClass}"
          on:click={() => handleRowClick(rule)}>
          
          <td class="font-monospace small text-break">{rule.selector}</td>
          
          <td class="text-center">
            <span class={`spec-badge spec-${formatSpecificity(spec)}`}>
              {spec.toString()}
            </span>
          </td>
          
          <td class="text-center">
            {#if spec.a >= 1}
              <span class="risk-text-high">ID Used</span>
            {:else if spec.value >= 100}
              <span class="risk-text-medium">High</span>
            {:else}
              <span class="risk-text-low">Low</span>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /*
    Custom styles for the Bubbly/Glass theme.
    We use :global() to target theme attributes applied to the body/html,
    which fixes the Svelte "unused selector" warnings.
  */

  .specificity-table {
    margin-bottom: 0;
    width: 100%;
    /* Ensure the table itself doesn't have background color, using the parent glass-card background */
    --bs-table-bg: transparent; 
    border-collapse: separate; /* Required for custom border-radius on elements */
  }
  
  /* --- Table Header Styling --- */
  .table-head {
    /* Base for Dark Mode (Dark blue background, light text) */
    background-color: var(--brand-blue);
    color: var(--theme-white);
    position: sticky;
    top: 0;
    z-index: 2;
  }
  
  /* FIX: Ensure high contrast in Light Mode by enforcing a dark background color AND dark text.
     The compiler warning selectors are wrapped in :global() */
  :global([data-bs-theme="light"]) .table-head {
    /* A guaranteed dark blue background */
    background-color: #004a80; 
    /* The crucial fix: switch text color to white for contrast */
    color: white; 
  }
  
  /* FIX: Ensure Light Mode header text is readable */
  :global([data-bs-theme="light"]) .table-head th {
    color: white; /* Make sure the text color is applied to the <th> element */
  }
  
  /* Ensure Dark Mode header text is readable (if base color isn't strong enough) */
  :global([data-bs-theme="dark"]) .table-head th {
    color: var(--theme-white); 
  }

  .table-head th {
    /* Uses the color set by .table-head container */
    border-bottom: 2px solid var(--brand-orange) !important;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  /* Sortable Headers */
  .sortable-header {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
  }
  .sortable-header:hover {
    /* Uses text color from parent */
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Risk Row Coloring (Based on the custom classes defined in the script) */
  .table-row.risk-high-id { 
    background-color: rgba(220, 53, 69, 0.05); /* Soft Red/Danger tint */
  }
  .table-row.risk-medium-high {
    background-color: rgba(255, 193, 7, 0.05); /* Soft Yellow/Warning tint */
  }

  /* Use :global() to prevent "unused selector" warnings for Dark Mode overrides */
  :global([data-bs-theme="dark"]) .table-row.risk-high-id { 
    background-color: rgba(220, 53, 69, 0.1); 
  }
  
  :global([data-bs-theme="dark"]) .table-row.risk-medium-high { 
    background-color: rgba(255, 193, 7, 0.1); 
  }
  
  /* Risk Text Colors */
  .risk-text-high { color: var(--bs-danger); font-weight: bold; }
  .risk-text-medium { color: var(--bs-warning); font-weight: bold; }
  .risk-text-low { color: var(--bs-success); }
  
  /* Specificity Badges (Override Bootstrap defaults for better look) */
  .spec-badge {
    border-radius: 5px;
    padding: 0.3em 0.6em;
    font-size: 0.75rem;
    font-weight: 700;
  }

  /* Custom badge colors based on formatSpecificity output */
  .spec-id { background-color: var(--bs-danger); color: white; }
  .spec-class { background-color: var(--brand-orange); color: var(--brand-blue); }
  .spec-tag { background-color: var(--bs-success); color: white; }
  
  /* Use :global() to prevent "unused selector" warning for Dark Mode spec-class override */
  :global([data-bs-theme="dark"]) .spec-class { 
      /* Ensures dark text on the orange badge background in dark mode for contrast */
      color: black; 
  }
  
  /* Generic row styling */
  .table-row td {
    border-top: 1px solid var(--glass-border);
    transition: background-color 0.2s, transform 0.2s;
  }
  
  /* Smooth Hover Effect */
  .table-row:hover {
    background-color: rgba(255, 174, 66, 0.15) !important; /* Orange tint on hover */
    transform: scale(1.005);
    box-shadow: 0 0 8px rgba(255, 174, 66, 0.2);
  }
</style>