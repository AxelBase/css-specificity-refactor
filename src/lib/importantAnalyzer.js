// src/lib/importantAnalyzer.js
/**
 * Finds all declarations using !important
 */
export function findImportants(cssText) {
  const importances = [];
  const lines = cssText.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.includes('!important')) {
      const propertyMatch = trimmed.match(/^([\w-]+)/);
      const property = propertyMatch ? propertyMatch[0] : 'unknown';

      importances.push({
        line: index + 1,
        property,
        declaration: trimmed.replace(/;/g, ''),
        risk: canLikelyRemoveImportant(property) ? 'Low' : 'High',
        suggestion: canLikelyRemoveImportant(property)
          ? 'Can likely remove !important – property is naturally strong'
          : 'Keep !important – conflicts with inline styles or third-party'
      });
    }
  });

  return importances;
}

function canLikelyRemoveImportant(prop) {
  const safeProps = ['color', 'background', 'font-size', 'margin', 'padding', 'border', 'display', 'position'];
  return safeProps.some(p => prop.startsWith(p));
}