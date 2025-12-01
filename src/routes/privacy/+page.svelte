<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | CSS Specificity Refactor Tool</title>
  <meta name="description" content="We collect nothing. Your CSS never leaves your browser. Read our zero-data privacy commitment." />
  <meta property="og:title" content="Privacy Policy | CSS Specificity Refactor Tool" />
  <meta property="og:description" content="100% client-side. No tracking. No cookies. No data collection — ever." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: December 1, 2025</p>

    <p>Welcome to the <strong>CSS Specificity Refactor Tool</strong>, a completely client-side web application. This Privacy Policy is simple because our approach to privacy is simple: <strong>we collect absolutely nothing</strong>.</p>

    <p><strong>No data ever leaves your browser.</strong> When you paste CSS into this tool, all analysis, parsing, and specificity calculations happen 100% locally on your device using JavaScript. We do not have servers that store, log, or process your code.</p>

    <h2>What We Do Not Collect</h2>
    <p>This tool operates with a strict zero-data policy:</p>
    <ul>
      <li><strong>No personal information</strong> — name, email, IP address, or location</li>
      <li><strong>No CSS content</strong> — your stylesheets are never uploaded or transmitted</li>
      <li><strong>No analytics or tracking</strong> — no Google Analytics, no cookies, no pixels</li>
      <li><strong>No localStorage persistence</strong> — nothing is saved between sessions unless you manually export</li>
      <li><strong>No third-party requests</strong> — only static assets are loaded from CDNs with Subresource Integrity</li>
    </ul>

    <h2>How the Tool Actually Works</h2>
    <p>Every feature — parsing, specificity calculation, suggestion engine, and share links — runs entirely in your browser using pure JavaScript. Even when you use the "Copy Share Link" feature, the CSS is compressed into the URL hash using client-side LZ-string compression. Nothing is sent to any server.</p>

    <h2>Security & Data Control</h2>
    <p>Because there is no backend, there is no database to hack, no logs to leak, and no data to sell. Your CSS remains completely under your control at all times. You can even disconnect from the internet after loading and the tool will continue to function perfectly.</p>

    <h2>Updates to This Policy</h2>
    <p>We may update this policy if we add new features, but our core promise remains unchanged: <strong>your CSS stays yours</strong>. Any changes will be clearly dated and announced.</p>

    <h2>Contact</h2>
    <p>Questions? Found a bug? Want to contribute? Open an issue on our <a href="https://github.com/axelbase/css-specificity-refactor" target="_blank" rel="noopener">GitHub repository</a>.</p>

    <p class="italic-note"><strong>Privacy isn’t a feature — it’s the foundation.</strong> This tool exists to help you write better CSS, not to monetize your code. Thank you for trusting us with your stylesheets.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 2rem; font-size: .95rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-primary); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose h1 { font-size: 2.6rem; margin-bottom: .5rem; color: var(--accent-secondary); }
  .prose .post-meta { color: var(--text-secondary); font-size: .9rem; margin-bottom: 2.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h2 { margin-top: 2.5rem; color: var(--accent-secondary); border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
  .prose p { margin: 1.2rem 0; line-height: 1.8; }
  .prose ul { padding-left: 1.5rem; margin: 1.5rem 0; }
  .prose li { margin: .6rem 0; line-height: 1.7; }
  .prose strong { color: var(--text-primary); }
  .prose a { color: var(--accent-primary); }
  .italic-note { font-style: italic; text-align: center; margin-top: 4rem; font-size: 1.1rem; color: var(--text-secondary); }
</style>