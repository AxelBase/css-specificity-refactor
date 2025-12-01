// src/lib/parser.js
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

/**
 * Ultimate CSS parser for the CSS Specificity Refactor Tool
 * • Handles nesting, :is(), :has(), @apply, variables
 * • Strips Markdown code blocks
 * • 100% silent in production
 * • Graceful fallback
 * • No externalized module warnings
 */
export function parseCSS(cssText) {
  if (!cssText?.trim()) return [];

  // Remove Markdown code fences: ```css ... ```
  cssText = cssText.replace(/^```(?:css)?\s*\n?|```$/gi, '').trim();

  const rules = [];

  // === Suppress Vite's "externalized for browser compatibility" warnings ===
  // These are harmless but noisy — we silence them globally once
  if (typeof window !== 'undefined' && !window.__postcss_warnings_suppressed) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const msg = args[0];
      if (typeof msg === 'string' && msg.includes('externalized for browser compatibility')) {
        return; // Silence PostCSS Node.js module warnings
      }
      originalWarn(...args);
    };
    window.__postcss_warnings_suppressed = true;
  }

  try {
    const root = postcss.parse(cssText);

    root.walkRules((rule) => {
      try {
        let selector = rule.selector?.trim();
        if (!selector) return;

        const startLine = rule.source?.start?.line || 1;

        // Use selector-parser to normalize and clean selector string
        try {
          const result = selectorParser().processSync(selector);
          selector = result.trim();
        } catch {
          // Fallback: use raw selector if parser fails (very rare)
        }

        // Skip @rules and empty selectors
        if (!selector || selector.startsWith('@')) return;

        rules.push({
          selector,
          position: { start: { line: startLine } },
          declarations: [] // Not needed for specificity
        });
      } catch {
        // Individual broken rule — skip silently
        // In dev you could uncomment below if debugging
        // if (import.meta.env.DEV) console.debug('Skipped invalid rule');
      }
    });

    return rules;
  } catch (err) {
    // PostCSS failed entirely — fall back to ultra-safe regex
    // This should only happen with completely broken input
    return regexFallback(cssText);
  }
}

/**
 * Emergency fallback parser — works on anything
 * Used only when PostCSS throws
 */
function regexFallback(cssText) {
  const rules = [];
  const lines = cssText.split('\n');
  let currentLine = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Look for selector before an opening brace
    if (line.includes('{') && !line.startsWith('@')) {
      let selector = line.split('{')[0].trim();

      if (selector) {
        rules.push({
          selector,
          position: { start: { line: currentLine } },
          declarations: []
        });
      }
    }

    currentLine++;
  }

  return rules;
}