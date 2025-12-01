<!-- src/components/ShareLink.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { encodeStateToUrl } from '$lib/shareUrl.js';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';

  export let cssText: string = '';

  $: shareUrl = browser && cssText.trim()
    ? `${window.location.origin}${base}${encodeStateToUrl(cssText)}`
    : '';

  let copied = false;

  async function copyLink() {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  }
</script>

{#if browser && cssText.trim()}
  <div class="share-section mt-4" transition:fade>
    <p class="text-muted small mb-2">Share this exact CSS state:</p>
    <div class="input-group">
      <input
        type="text"
        class="form-control form-control-sm"
        value={shareUrl}
        readonly
        aria-label="Shareable link"
      />
      <button
        class="btn {copied ? 'btn-success' : 'btn-outline-primary'} btn-sm"
        on:click={copyLink}
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
    <p class="text-muted small mt-2 mb-0">
      Anyone with this link sees your exact CSS + scroll position.
    </p>
  </div>
{/if}

<style>
  .share-section {
    background: rgba(0, 123, 255, 0.08);
    border: 1px solid rgba(0, 123, 255, 0.25);
    border-radius: 12px;
    padding: 1rem;
    font-size: 0.9rem;
  }
  .input-group .form-control {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
  }
  .btn {
    font-weight: 600;
  }
</style>