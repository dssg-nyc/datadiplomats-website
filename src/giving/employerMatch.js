// Company-name lookup for the Give page. Runs entirely in the browser over a
// small reviewed list; the typed name is never sent anywhere or stored.
export const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const names = (employer) => [employer.name, ...(employer.aliases || [])].map(normalize);

/** Employers whose name or alias starts with, or contains, the query. Best matches first. */
export function searchEmployers(query, employers, limit = 5) {
  const q = normalize(query);
  if (q.length < 2) return [];
  const scored = [];
  for (const employer of employers) {
    const all = names(employer);
    let score = 0;
    if (all.some((n) => n === q)) score = 3;
    else if (all.some((n) => n.startsWith(q))) score = 2;
    else if (all.some((n) => n.split(' ').some((word) => word.startsWith(q)) || n.includes(` ${q}`))) score = 1;
    if (score) scored.push({ employer, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.employer);
}
