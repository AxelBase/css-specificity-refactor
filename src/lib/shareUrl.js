// src/lib/shareUrl.js
import pkg from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = pkg;

/**
 * Compress CSS for URL sharing
 */
export function encodeStateToUrl(css) {
  if (!css?.trim()) return '';
  try {
    const compressed = compressToEncodedURIComponent(css.trim());
    return compressed ? `#css=${compressed}` : '';
  } catch {
    return '';
  }
}

/**
 * Extract and decompress CSS from URL hash
 */
export function decodeStateFromUrl() {
  if (typeof window === 'undefined') return null;
  
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith('css=')) return null;

  const compressed = hash.slice(4);
  if (!compressed) return null;

  try {
    return decompressFromEncodedURIComponent(compressed) || null;
  } catch {
    return null;
  }
}