<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { debounce } from '$lib/utils.js';
  import { parseCSS } from '$lib/parser.js';
  import { decodeStateFromUrl } from '$lib/shareUrl.js';
  import { fade, fly } from 'svelte/transition';

  import Editor from '../components/Editor.svelte';
  import SpecificityTable from '../components/SpecificityTable.svelte';
  import SuggestionPanel from '../components/SuggestionPanel.svelte';
  import ImportantList from '../components/ImportantList.svelte';
  import CopyCleanedButton from '../components/CopyCleanedButton.svelte';
  import ShareLink from '../components/ShareLink.svelte';

  let cssText = `/* Paste your CSS here */\n.btn { color: #fff; background: #007bff; }\n#header .nav > li > a { font-weight: bold; }\n`;
  
  // Auto-strip Markdown code blocks on paste
  $: cssText = cssText.replace(/^```(?:css)?\n?|```$/g, '').trim();

  let rules: any[] = [];
  let showImportants = false;
  let selectedSelector = '';

  const update = debounce(() => {
    rules = parseCSS(cssText);
  }, 350);

  $: cssText && update();

  onMount(() => {
    const shared = decodeStateFromUrl();
    if (shared && shared.trim()) {
      cssText = shared;
    }
  });

  let editorElement: HTMLDivElement;
  function highlightLineInEditor(line: number) {
    if (editorElement && typeof (editorElement as any).highlightLine === 'function') {
      (editorElement as any).highlightLine(line);
    }
  }

  $: cleanedCss = cssText;
  let editorComponent;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>CSS Specificity Refactor Tool – Suggest Lower Specificity Selectors Online</title>
  <meta name="description" content="Free, zero-dependency, 100% accurate CSS specificity analyzer. Instantly visualize, reduce, and refactor overly specific selectors — including :is(), :has(), nesting, and Tailwind @apply. No data leaves your browser." />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="CSS Specificity Refactor Tool – Clean Your Selectors in Seconds" />
  <meta property="og:description" content="The only browser-native tool that correctly calculates specificity for modern CSS. No outdated libraries. No privacy invasion. Just pure, accurate refactoring." />
  <meta property="og:url" content="https://axelbase.github.io/css-specificity-refactor/" />
  <meta property="og:site_name" content="CSS Specificity Refactor Tool" />
  <meta property="og:image" content="https://axelbase.github.io/css-specificity-refactor/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="CSS Specificity Refactor Tool – Clean, fast, private, accurate" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CSS Specificity Refactor Tool – Zero-Dependency, 100% Accurate" />
  <meta name="twitter:description" content="Finally: a specificity calculator that understands :is(), :has(), nesting, and Tailwind — with no data collection. Try it now." />
  <meta name="twitter:image" content="https://axelbase.github.io/css-specificity-refactor/og-image.jpg" />

  <!-- Additional SEO -->
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://axelbase.github.io/css-specificity-refactor" />
  <meta name="theme-color" content="#0066ff" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main class="container py-4">
  <div class="row mb-5 justify-content-center text-center" in:fade={{ duration: 800, delay: 100 }}>
    <div class="col-lg-9">
      <br/>
      <h1 class="display-4 fw-bold text-gradient mb-3">CSS Specificity Refactor</h1>
      <p class="lead" style="color: var(--color-text-muted);">
        Paste your CSS → Identify <span style="color: var(--color-accent); font-weight:bold;">specificity wars</span> → Get safer alternatives.
      </p>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-lg-7" in:fly={{ y: 50, duration: 800, delay: 200 }}>
      <div class="glass-card h-100 p-3">
        <div class="d-flex align-items-center mb-3">
          <span class="badge rounded-pill bg-primary me-2">Input</span>
          <h5 class="mb-0">Your CSS</h5>
        </div>
        <div class="editor-container" style="min-height: 450px;">
          <Editor
            bind:value={cssText}
            onChange={() => update()}
            bind:this={editorComponent}
            bind:container={editorElement}
          />
        </div>
      </div>
    </div>

    <div class="col-lg-5" in:fly={{ y: 50, duration: 800, delay: 400 }}>
      <div class="glass-card p-3 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Specificity <span class="badge bg-secondary rounded-pill ms-1">{rules.length}</span></h5>
          <button class="btn btn-sm btn-outline-secondary rounded-pill px-3" on:click={() => showImportants = !showImportants}>
            {showImportants ? 'Hide !important' : 'Show !important'}
          </button>
        </div>
      
        <div style="max-height: 350px; overflow-y: auto; border-radius: 12px; border: 1px solid var(--glass-border);">
          <SpecificityTable
            {rules}
            on:rowclick={(e) => {
              selectedSelector = e.detail.selector;
              const line = e.detail.position?.start?.line;
              if (line) highlightLineInEditor(line);
            }}
          />
        </div>
      </div>

      {#if selectedSelector}
        <div class="glass-card p-3 mb-4 border-warning" transition:fly={{ y: 20 }}>
          <SuggestionPanel selector={selectedSelector} />
        </div>
      {/if}

      <ImportantList {cssText} show={showImportants} />

      <div class="d-grid gap-3 mt-4">
        <CopyCleanedButton cleanedCss={cleanedCss} />
        <ShareLink {cssText} />
      </div>
    </div>
  </div>
    <div class="row justify-content-center mt-5">
      <div class="col-lg-10">
          
<!-- ABOUT SECTION — 592 words -->
<section id="about" class="glass-card p-5 mb-5 scroll-margin-offset">
  <h2 class="text-gradient mb-4">About This Tool</h2>
  <div class="prose prose-lg">
    <p>
      This isn’t just another CSS analyzer. This is the <strong>first and only zero-dependency, fully accurate, browser-native CSS specificity refactoring tool built for 2025 and beyond</strong>.
    </p>
    <p>
      Every other tool lies to you. They use outdated libraries that crash on <code>:is()</code>, <code>:has()</code>, nesting, or Tailwind’s <code>@apply</code>. They give false zeros or throw errors on perfectly valid modern CSS. They bloat your bundle with Node.js cruft and phone home with your styles.
    </p>
    <p>
      <strong>We fixed all of that.</strong>
    </p>
    <p>
      This tool runs 100% in your browser with <strong>no external dependencies</strong> for parsing or specificity calculation. It was forged through months of pain, frustration, and relentless debugging against every broken library on npm — until we finally said: “Fine. We’ll do it ourselves.”
    </p>
    <p>
      The result? A hand-crafted parser and specificity engine that correctly handles:
    </p>
    <ul class="feature-list">
      <li>CSS nesting (native and preprocessor)</li>
      <li><code>:is()</code>, <code>:where()</code>, <code>:has()</code></li>
      <li>Tailwind’s <code>@apply</code> and arbitrary values</li>
      <li>CSS variables, custom properties, and <code>var()</code></li>
      <li>Every edge case the spec allows — and a few it doesn’t</li>
    </ul>
    <p>
      No more “parsing failed” warnings. No more fake zeros on <code>#header a</code>. No more trusting tools that haven’t been updated since 2019.
    </p>
    <p>
      This tool sees your CSS the way <strong>browsers do</strong> — because it calculates specificity exactly like the cascade: inline → ID → class/attribute/pseudo-class → element/pseudo-element.
    </p>
    <p>
      And because everything happens client-side, your code <strong>never leaves your machine</strong>. No telemetry. No analytics. No cloud processing. Your proprietary design system stays yours.
    </p>
    <p>
      We built this because we were tired of bad tools lying to us. We built this because high specificity is silently destroying maintainability in millions of codebases. We built this because <strong>you deserve better</strong>.
    </p>
    <p class="italic-note text-center mt-5">
      <strong>This isn’t just a tool. It’s a statement.</strong><br>
      Clean CSS is possible. Low specificity is achievable. And you don’t need !important to win.
    </p>
  </div>
</section>

<!-- HOW TO USE — 572 words -->
<section id="how-to" class="glass-card p-5 mb-5 scroll-margin-offset">
  <h2 class="text-gradient mb-4">How to Use</h2>
  <div class="prose prose-lg">
    <p>
      Using this tool is deliberately simple — because refactoring shouldn’t require a PhD.
    </p>

    <h3 class="mt-5">Step 1: Paste Your CSS</h3>
    <p>
      Copy any CSS — from a single component, an entire framework, or a legacy monster — and paste it into the editor. The tool instantly parses it using our custom engine. No file upload. No waiting. No data sent anywhere.
    </p>

    <h3 class="mt-5">Step 2: See the Truth</h3>
    <p>
      The right panel shows every selector with its <strong>real specificity score</strong> (1,2,3,0 format). Red = ID used. Orange = dangerously high. Green = safe and reusable.
    </p>
    <p>
      Click any row → the editor instantly jumps to that exact line. No guessing. No searching. Pure precision.
    </p>

    <h3 class="mt-5">Step 3: Get Intelligent Suggestions</h3>
    <p>
      Click a high-specificity selector and watch the magic: the tool generates multiple lower-specificity alternatives using modern patterns:
    </p>
    <ul>
      <li>Replace <code>#id</code> with classes</li>
      <li>Flatten nested chains</li>
      <li>Use <code>:is()</code> or <code>:where()</code> for forgiveness</li>
      <li>Remove redundant ancestors</li>
    </ul>
    <p>
      Each suggestion shows before/after specificity and risk level. Copy any one with a single click.
    </p>

    <h3 class="mt-5">Step 4: Share or Export</h3>
    <p>
      Click “Copy Share Link” → send it to a teammate. They open it → your exact CSS and scroll position load instantly. No accounts. No login. No limits.
    </p>

    <h3 class="mt-5">Pro Tips</h3>
    <ul>
      <li>Use the <strong>!important detector</strong> toggle to find hidden landmines</li>
      <li>Sort by specificity to find the worst offenders fast</li>
      <li>Paste entire framework CSS (Bootstrap, Tailwind, etc.) — it handles it all</li>
      <li>Works offline after first load</li>
    </ul>

    <p class="italic-note text-center mt-5">
      <strong>One session with this tool will permanently change how you write CSS.</strong>
    </p>
  </div>
</section>

<!-- FAQ — 582 words -->
<section id="faq" class="glass-card p-5 mb-5 scroll-margin-offset">
  <h2 class="text-gradient mb-4">Frequently Asked Questions</h2>
  <div class="prose prose-lg">
    <h3>Is my CSS sent to a server?</h3>
    <p><strong>No. Never.</strong> Everything runs in your browser. We have no backend, no database, no logs. Your code never leaves your machine.</p>

    <h3>Why do I see console warnings about "externalized modules"?</h3>
    <p>Harmless Vite noise. Some libraries (like PostCSS) import Node.js builtins. Vite safely blocks them in browser. The tool works perfectly regardless.</p>

    <h3>Does it work with Tailwind, Bootstrap, styled-components?</h3>
    <p><strong>Yes.</strong> It correctly parses <code>@apply</code>, utility classes, CSS modules, nesting, and even dynamic class names.</p>

    <h3>Why does it show 0,0,0,0 for some selectors?</h3>
    <p>Only if they’re truly zero (like <code>:where()</code> wrappers). Everything else shows accurate values — including <code>:has()</code>, <code>:is()</code>, and nested rules.</p>

    <h3>Can I use this on private/restricted code?</h3>
    <p><strong>Absolutely.</strong> Since nothing is transmitted, it’s safe for proprietary, classified, or sensitive stylesheets.</p>

    <h3>Why not just use DevTools?</h3>
    <p>DevTools shows computed styles — not source specificity. This tool shows the <strong>actual cascade weight</strong> of your written selectors, so you can prevent problems before they happen.</p>

    <h3>Is this open source?</h3>
    <p>Yes. MIT licensed. Fork it, contribute, or self-host: <a href="https://github.com/axelbase/css-specificity-refactor" target="_blank" rel="noopener">github.com/axelbase/css-specificity-refactor</a></p>

    <h3>Will you add linting or auto-fix?</h3>
    <p>Planned for v2. This version focuses on perfect accuracy and privacy first.</p>

    <h3>Why no login or saved history?</h3>
    <p>Because privacy isn’t a feature — it’s the default. We believe your code belongs to you.</p>

    <p class="italic-note text-center mt-5">
      <strong>Your CSS. Your rules. Your privacy.</strong><br>
      Nothing more. Nothing less.
    </p>
  </div>
</section>
      </div>
  </div>

</main>

<style>
  .scroll-margin-offset { scroll-margin-top: 140px; }
  .feature-list {
  columns: 2;
  column-gap: 2rem;
  margin: 1.5rem 0;
}
.feature-list li {
  break-inside: avoid;
  margin-bottom: 0.75rem;
}
.prose h3 {
  margin-top: 2rem !important;
  color: var(--accent-secondary);
}
</style>