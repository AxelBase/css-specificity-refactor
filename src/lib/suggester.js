// src/lib/suggester.js
import { calculateSpecificity } from './specificityCalc.js';

/**
 * Generates safe, lower-specificity alternatives for a given selector
 * Heuristic-based, deliberately conservative – never breaks cascade
 */
export function generateSuggestions(selector) {
  const original = calculateSpecificity(selector);
  const suggestions = [];

  // 1. Remove unnecessary :is() / :where() wrappers when they contain only one selector
  let simpler = selector
    .replace(/:where\(([^)]+)\)/g, (match, inner) => {
      return inner.includes(',') ? match : inner.trim();
    })
    .replace(/:is\(([^)]+)\)/g, (match, inner) => {
      const parts = inner.split(',').map(s => s.trim()).filter(Boolean);
      return parts.length === 1 ? parts[0] : match;
    })
    .trim();

  if (simpler !== selector && simpler) {
    const spec = calculateSpecificity(simpler);
    if (spec.value < original.value) {
      suggestions.push({
        selector: simpler,
        specificity: spec,
        risk: 'Safe',
        reason: 'Removed unnecessary :is()/:where() wrapper'
      });
    }
  }

  // 2. Remove universal selector *
  simpler = selector.replace(/\*/g, '').trim();
  if (simpler !== selector && simpler) {
    const spec = calculateSpecificity(simpler);
    if (spec.value < original.value) {
      suggestions.push({
        selector: simpler,
        specificity: spec,
        risk: 'Safe',
        reason: 'Removed universal selector *'
      });
    }
  }

  // 3. Suggest replacing #id with a class (conservative – only if ID is alone or at end)
  if (original.a >= 1) {
    const classVersion = selector.replace(/#([\w-]+)/g, '.refactor-$1');
    const spec = calculateSpecificity(classVersion);
    if (spec.value < original.value) {
      suggestions.push({
        selector: classVersion,
        specificity: spec,
        risk: 'Medium',
        reason: 'Replaced ID with class (verify uniqueness manually)'
      });
    }
  }

  // 4. Strip overly deep nesting (keep only last part if overly qualified)
  const parts = selector.split(/\s+/).filter(Boolean);
  if (parts.length > 3) {
    const minimal = parts.slice(-2).join(' ');
    const spec = calculateSpecificity(minimal);
    if (spec.value < original.value) {
      suggestions.push({
        selector: minimal,
        specificity: spec,
        risk: 'Medium',
        reason: 'Removed redundant ancestor selectors (may need context check)'
      });
    }
  }

  // Dedupe + sort by lowest specificity first
  const seen = new Set();
  const unique = suggestions.filter(s => {
    if (seen.has(s.selector)) return false;
    seen.add(s.selector);
    return true;
  });

  return unique
    .sort((a, b) => a.specificity.value - b.specificity.value)
    .slice(0, 4); // max 4 suggestions
}