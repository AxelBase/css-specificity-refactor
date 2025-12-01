<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>404 — Page Not Found | CSS Specificity Refactor Tool</title>
  <meta name="description" content="Oops! The page you're looking for doesn't exist. Return home to analyze and improve your CSS specificity." />
  <meta property="og:title" content="404 — Page Not Found" />
  <meta property="og:description" content="The page was not found. Come back home to refactor your CSS." />
  <meta property="og:url" content="{base}/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="container fade-in post-layout text-center" style="padding:100px">
  <article class="prose">
    <h1>404 — Page Not Found</h1>
    <p class="post-meta">You’ve wandered into uncharted specificity territory</p>

    <div class="not-found-visual">
      <div class="big-404">404</div>
      <p>Looks like this selector has been successfully refactored... out of existence.</p>
    </div>

    <p>Don’t worry — your CSS is safe. The page you’re looking for has either been moved, deleted, or never existed in the first place.</p>

    <h2>Where to go from here?</h2>
    <ul class="helpful-links">
      <li><a href="{base}/">← Back to CSS Specificity Refactor Tool</a></li>
      <li><a href="{base}/blog">Read the Blog</a></li>
      <li><a href="{base}/privacy">Privacy Policy</a></li>
      <li><a href="{base}/terms">Terms & Conditions</a></li>
      <li><a href="https://github.com/axelbase/css-specificity-refactor" target="_blank" rel="noopener">View Source on GitHub</a></li>
    </ul>

    <p>Or just hit the button below and start cleaning up some overly specific selectors — we won’t judge.</p>

    <a href="{base}/" class="btn-primary large">Take Me Home →</a>

    <p class="italic-note">
      <strong>Pro tip: Sometimes the best refactor is deleting the line entirely.</strong>
    </p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding: 4rem 1rem;
    margin: 0 auto;
  }

  .big-404 {
    font-size: 8rem;
    font-weight: 900;
    color: var(--accent-primary);
    margin: 2rem 0;
    line-height: 1;
    letter-spacing: -0.5rem;
    opacity: 0.9;
  }

  .not-found-visual p {
    font-size: 1.3rem;
    color: var(--text-primary);
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .helpful-links {
    list-style: none;
    padding: 0;
    margin: 3rem 0;
  }

  .helpful-links li {
    margin: 1rem 0;
    font-size: 1.2rem;
  }

  .helpful-links a {
    color: var(--accent-secondary);
    text-decoration: none;
    padding: 0.5rem 0;
    display: inline-block;
    transition: transform 0.2s;
  }

  .helpful-links a:hover {
    transform: translateX(8px);
  }

  .btn-primary {
    display: inline-block;
    background: var(--accent-primary);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    margin-top: 2rem;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .btn-primary.large {
    font-size: 1.3rem;
    padding: 1.2rem 3rem;
  }

  .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 5rem;
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    .big-404 {
      font-size: 5.5rem;
      letter-spacing: -0.3rem;
    }
  }
</style>