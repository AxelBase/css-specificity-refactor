<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | CSS Specificity Refactor Tool</title>
  <meta name="description" content="Terms of use for the free, open-source CSS Specificity Refactor Tool. No account required, no data collected." />
  <meta property="og:title" content="Terms & Conditions | CSS Specificity Refactor Tool" />
  <meta property="og:description" content="Simple, fair terms for a free tool that respects your privacy and ownership." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout" >
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last updated: December 1, 2025</p>

    <p>By using the <strong>CSS Specificity Refactor Tool</strong> ("the Tool"), you agree to these Terms & Conditions. This is a free, open-source, client-side web application — no login, no payment, no tricks.</p>

    <h2>1. Nature of Service</h2>
    <p>The Tool is a static web application that runs entirely in your browser. It analyzes CSS you paste or type, calculates selector specificity, and suggests lower-specificity alternatives. All processing happens locally on your device.</p>

    <h2>2. No Warranty — As-Is</h2>
    <p>The Tool is provided <strong>"as is"</strong> without any warranties, express or implied. While we strive for accuracy, we do not guarantee that specificity calculations or suggestions will be perfect or suitable for your specific use case. Use at your own risk.</p>

    <h2>3. No Liability</h2>
    <p>We are not liable for any damage, data loss, or issues arising from using the Tool — including but not limited to incorrect refactoring suggestions that break your styles. You are solely responsible for reviewing and testing any changes before applying them to production code.</p>

    <h2>4. Intellectual Property</h2>
    <p>The Tool’s source code is licensed under the MIT License and available on GitHub. Your CSS input remains 100% yours — we never see it, store it, or claim rights to it.</p>

    <h2>5. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the Tool for illegal purposes</li>
      <li>Attempt to overload, attack, or interfere with the Tool or its hosting</li>
      <li>Attempt to extract or reverse-engineer the source beyond normal GitHub access</li>
    </ul>

    <h2>6. Changes & Availability</h2>
    <p>We may update, modify, or discontinue the Tool at any time without notice. We are not obligated to maintain uptime or backward compatibility.</p>

    <h2>7. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense.</p>

    <p class="italic-note"><strong>Simple:</strong> Use the tool freely, keep your CSS safe, be kind, and enjoy cleaner stylesheets.</p>
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
  .italic-note { font-style: italic; text-align: center; margin-top: 4rem; font-size: 1.1rem; color: var(--text-secondary); }
</style>