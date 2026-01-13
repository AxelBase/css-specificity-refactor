<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';

  const currentYear = new Date().getFullYear();

  // Theme toggle
  function toggleTheme() {
    if (typeof document !== 'undefined') {
      const current = document.body.getAttribute('data-bs-theme');
      document.body.setAttribute('data-bs-theme', current === 'dark' ? 'light' : 'dark');
    }
  }

  // Dropdown logic
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
       style="pointer-events: auto;">

    <div class="d-flex align-items-center gap-4">
      <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
        <span class="fw-bold fs-5 tracking-tight brand-text">AxelBase</span>
      </a>

      <ul class="d-none d-lg-flex list-unstyled m-0 gap-1">
        <li><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>
    </div>

    <div class="d-flex align-items-center gap-3">

      <button class="btn btn-outline-secondary btn-sm p-2 rounded-circle" on:click={toggleTheme} aria-label="Toggle Dark Mode">
        <i class="bi bi-moon-stars-fill"></i>
      </button>

      <!-- Buy Me a Coffee + Bitcoin Dropdown -->
      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="btn-coffee bmac-button d-flex align-items-center gap-2 text-white border-0 px-4 py-2 rounded-pill shadow-sm"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-sm-inline fw-semibold">Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass mt-2"
            transition:slide={{ duration: 220 }}
          >
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$3</span> One Coffee
            </a>
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$5</span> Two Coffees
            </a>
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Bitcoin
            </a>
          </div>
        {/if}
      </div>

    </div>
  </nav>
</header>

<slot />

<footer class="glass border-top py-3 mt-auto position-relative" style="z-index: 10;">
  <div class="container d-flex justify-content-between align-items-center small flex-wrap">
    <div class="text-muted">
      © {currentYear} AxelBase Refactor Tool
    </div>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="footer-link">Privacy</a>
      <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* ── Buy Me a Coffee Button ── */
  .bmac-button {
    background: var(--brand-orange);
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(255, 174, 66, 0.35);
    transition: all 0.3s ease;
  }

  .bmac-button:hover {
    background: #ffc978;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(255, 174, 66, 0.5);
  }

  /* ── Dropdown (enhanced version of File 1 style in glass context) ── */
  .bmac-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1000;
    padding: 6px 0;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.96rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(255, 174, 66, 0.18);
    color: var(--color-accent);
    padding-left: 26px;
  }

  .bmac-dropdown .amount {
    font-weight: 800;
    color: var(--brand-orange);
    font-size: 1.12rem;
    min-width: 42px;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 700;
    color: var(--color-accent);
    justify-content: center !important;
    border-top: 1px solid var(--glass-border);
    margin-top: 4px;
    padding-top: 12px;
  }

  .bitcoin-option {
    color: #f7931a !important;
    font-weight: 700;
  }

  .bitcoin-option:hover {
    background: rgba(247, 147, 26, 0.12) !important;
    color: #f7931a !important;
  }

  /* Keep original nav & footer styles */
  .brand-text { color: var(--color-text-main); transition: color 0.3s; }
  .navbar-brand-logo { height: 32px; width: auto; border-radius: 50%; border: 2px solid var(--color-accent); padding: 2px; background:white; }

  .nav-link-custom {
    padding: 0.5rem 1rem;
    color: var(--color-text-muted);
    font-weight: 600;
    text-decoration: none;
    position: relative;
    transition: color 0.3s;
  }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom::after {
    content: ''; position: absolute; width: 0; height: 3px; bottom: 0; left: 50%;
    background-color: var(--color-accent); transition: all 0.3s ease; transform: translateX(-50%); border-radius: 50px;
  }
  .nav-link-custom:hover::after { width: 60%; }

  .footer-link { color: var(--color-text-muted); text-decoration: none; }
  .footer-link:hover { color: var(--color-accent); }
</style>