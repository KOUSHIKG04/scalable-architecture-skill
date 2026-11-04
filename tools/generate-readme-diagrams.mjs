import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const diagrams = [
  { file: "architecture-flow.svg", title: "Architecture decision flow", labels: ["Requirements", "System Architecture", "Application Boundaries", "Repository Architecture", "Feature Ownership", "Contracts / APIs", "Application & Domain Logic", "Data Access", "Database", "Infrastructure", "Implementation"] },
  { file: "vertical-feature-flow.svg", title: "End-to-end vertical feature flow", labels: ["UI / Client", "Route / Adapter", "Owning Feature", "Runtime Validation", "Authentication / Authorization", "Application / Domain Logic", "Data Access", "Database / Integration", "Response / Cache", "UI Update"] },
  { file: "dependency-model.svg", title: "Dependency direction", labels: ["Routes / Transport", "Features / Application", "Contracts / Domain Rules", "Data Access", "Database / External Systems"] },
];
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function wrap(label) {
  if (label.length <= 25) return [label];
  const words = label.split(" ");
  let first = "";
  while (words.length > 1 && (first + " " + words[0]).trim().length <= 23) first = (first + " " + words.shift()).trim();
  return [first, words.join(" ")];
}
for (const diagram of diagrams) {
  const columns = Math.min(3, diagram.labels.length);
  const rows = Math.ceil(diagram.labels.length / columns);
  const width = 920;
  const height = 48 + rows * 100 - 20;
  const position = (index) => {
    const row = Math.floor(index / columns);
    const col = row % 2 === 0 ? index % columns : columns - 1 - index % columns;
    return { x: 24 + col * 300, y: 24 + row * 100, row, col };
  };
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
    `<title id="title">${escape(diagram.title)}</title>`,
    `<desc id="desc">${escape(diagram.labels.join(" → "))}. Follow the numbered steps and arrows.</desc>`,
    `<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker></defs>`,
    `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>`,
  ];
  for (let i = 0; i < diagram.labels.length - 1; i++) {
    const a = position(i);
    const b = position(i + 1);
    let points;
    if (a.row !== b.row) points = `${a.x + 136},${a.y + 64} ${b.x + 136},${b.y - 3}`;
    else if (a.col < b.col) points = `${a.x + 272},${a.y + 32} ${b.x - 3},${b.y + 32}`;
    else points = `${a.x},${a.y + 32} ${b.x + 275},${b.y + 32}`;
    svg.push(`<polyline points="${points}" fill="none" stroke="#64748b" stroke-width="1.7" marker-end="url(#arrow)"/>`);
  }
  diagram.labels.forEach((label, i) => {
    const { x, y } = position(i);
    const endpoint = i === 0 || i === diagram.labels.length - 1;
    svg.push(`<rect x="${x}" y="${y}" width="272" height="64" rx="${endpoint ? 24 : 9}" fill="${endpoint ? "#eef2ff" : "#ffffff"}" stroke="${endpoint ? "#818cf8" : "#cbd5e1"}"/>`);
    svg.push(`<text x="${x + 15}" y="${y + 19}" fill="#64748b" font-family="Arial, sans-serif" font-size="10">${String(i + 1).padStart(2, "0")}</text>`);
    const lines = wrap(label);
    lines.forEach((line, j) => svg.push(`<text x="${x + 141}" y="${y + (lines.length === 1 ? 37 : 28) + j * 19}" text-anchor="middle" fill="#0f172a" font-family="Arial, sans-serif" font-size="14" font-weight="500">${escape(line)}</text>`));
  });
  svg.push("</svg>");
  fs.writeFileSync(path.join(root, "assets", diagram.file), svg.join("\n") + "\n");
  console.log("Generated assets/" + diagram.file);
}
