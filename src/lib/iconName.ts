// Convert a Lucide PascalCase icon name (as stored in features.json) to the
// Iconify identifier consumed by astro-icon (e.g. "LayoutGrid" → "lucide:layout-grid").

export function lucideKebab(pascal: string): string {
  return pascal
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase();
}

export function lucideId(name: string): string {
  return `lucide:${lucideKebab(name)}`;
}
