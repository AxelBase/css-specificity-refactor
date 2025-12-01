// src/lib/utils.js
/**
 * Simple debounce
 */
export function debounce(fn, wait = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

/**
 * Format specificity as colored badge text
 */
export function formatSpecificity(spec) {
  if (spec.a >= 1) return 'danger';
  if (spec.b >= 10 || spec.value >= 100) return 'warning';
  if (spec.value >= 50) return 'info';
  return 'success';
}