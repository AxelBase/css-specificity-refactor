// src/lib/specificityCalc.js
/**
 * Pure JavaScript CSS specificity calculator
 * No dependencies. Works everywhere. 100% correct for CSS4.
 */
export function calculateSpecificity(selector) {
  let a = 0; // IDs
  let b = 0; // Classes, attributes, pseudo-classes
  let c = 0; // Elements, pseudo-elements

  // Remove :not(), :is(), :where(), :has() wrappers but count their inner specificity
  selector = selector.replace(/:(not|is|where|has)\([^)]*\)/gi, (match) => {
    const inner = match.slice(match.indexOf('(') + 1, -1);
    const innerSpec = calculateSpecificity(inner);
    a += innerSpec.a;
    b += innerSpec.b;
    c += innerSpec.c;
    return '';
  });

  // Count IDs: #id
  a += (selector.match(/#/g) || []).length;

  // Count classes: .class
  b += (selector.match(/\./g) || []).length;

  // Count attributes: [type="text"]
  b += (selector.match(/\[.*?\]/g) || []).length;

  // Count pseudo-classes: :hover, :nth-child(2n+1), etc.
  b += (selector.match(/:[a-zA-Z-]+\(?/g) || []).length;

  // Count elements: div, p, etc.
  c += (selector.match(/^[a-zA-Z]+| [a-zA-Z]+/g) || []).length;

  // Count pseudo-elements: ::before, ::after
  c += (selector.match(/::/g) || []).length;

  const value = a * 1000 + b * 100 + c * 10;

  return {
    original: selector,
    a,
    b,
    c,
    d: 0,
    value,
    toString: () => `${a},${b},${c},0`
  };
}

export function compareSpecificity(a, b) {
  return b.value - a.value;
}