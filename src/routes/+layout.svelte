<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fade } from 'svelte/transition';

  const paypalUsername = 'AxelLab427'; 
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  // --- Theme Toggle Logic ---
  function toggleTheme() {
    if (typeof document !== 'undefined') {
        const current = document.body.getAttribute('data-bs-theme');
        document.body.setAttribute('data-bs-theme', current === 'dark' ? 'light' : 'dark');
    }
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

      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button class="btn btn-coffee d-flex align-items-center gap-2" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="coffee-icon">
             <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
          </svg>
          <span class="d-none d-sm-inline">Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="dropdown-menu-custom glass" transition:slide={{ duration: 200 }}>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" class="donation-link">
                ${amount}
              </a>
            {/each}
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
       &copy; {new Date().getFullYear()} AxelBase Refactor Tool
    </div>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="footer-link">Privacy</a>
      <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* Navbar Styling */
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

  /* Coffee Button */
  .btn-coffee {
    background: var(--brand-orange);
    color: var(--brand-blue);
    border: none;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(255, 174, 66, 0.3);
  }
  .btn-coffee:hover {
    background: #ffc978;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 174, 66, 0.5);
  }
  .coffee-icon { width: 18px; height: 18px; }

  /* Dropdown */
  .dropdown-menu-custom {
    position: absolute; top: 115%; right: 0; min-width: 100px;
    padding: 0.5rem; border-radius: 16px; display: flex; flex-direction: column; gap: 4px;
  }
  .donation-link {
    display: block; padding: 8px; text-align: center; border-radius: 8px;
    font-weight: bold; color: var(--brand-blue); background: rgba(255,255,255,0.4);
    text-decoration: none; transition: 0.2s;
  }
  .donation-link:hover { background: var(--brand-orange); color: white; }

  .footer-link { color: var(--color-text-muted); text-decoration: none; }
  .footer-link:hover { color: var(--color-accent); }
</style>