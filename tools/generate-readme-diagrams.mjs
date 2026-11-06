import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Labels and their order are the source of truth; SVGs are generated artifacts.
const diagrams = [
  {
    file: "architecture-flow.svg",
    title: "Architecture decision flow",
    subtitle: "From requirements to implementation",
    labels: ["Requirements", "System Architecture", "Application Boundaries", "Repository Architecture", "Feature Ownership", "Contracts / APIs", "Application & Domain Logic", "Data Access", "Database", "Infrastructure", "Implementation"],
  },
  {
    file: "vertical-feature-flow.svg",
    title: "End-to-end vertical feature flow",
    subtitle: "Follow one request from the client and back",
    labels: ["UI / Client", "Route / Adapter", "Owning Feature", "Runtime Validation", "Authentication / Authorization", "Application / Domain Logic", "Data Access", "Database / Integration", "Response / Cache", "UI Update"],
  },
  {
    file: "dependency-model.svg",
    title: "Dependency direction",
    subtitle: "Each layer depends on the layer below",
    labels: ["Routes / Transport", "Features / Application", "Contracts / Domain Rules", "Data Access", "Database / External Systems"],
    stacked: true,
  },
];

const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const lineBreaks = new Map([
  ["Application Boundaries", ["Application", "Boundaries"]],
  ["Repository Architecture", ["Repository", "Architecture"]],
  ["Application & Domain Logic", ["Application &", "Domain Logic"]],
  ["Authentication / Authorization", ["Authentication /", "Authorization"]],
  ["Application / Domain Logic", ["Application /", "Domain Logic"]],
  ["Database / Integration", ["Database /", "Integration"]],
]);

function start(diagram, height) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="${height}" viewBox="0 0 1040 ${height}" role="img" aria-labelledby="title desc">`,
    `<title id="title">${escape(diagram.title)}</title>`,
    `<desc id="desc">${escape(diagram.labels.join(" → "))}. Arrows show the direction; numbers preserve the reading order.</desc>`,
    `<defs>`,
    `<linearGradient id="paper" x2="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#f4f1e9"/></linearGradient>`,
    `<linearGradient id="ink" x2="0" y2="1"><stop stop-color="#373d36"/><stop offset="1" stop-color="#252b25"/></linearGradient>`,
    `<linearGradient id="ochre" x2="0" y2="1"><stop stop-color="#f4d986"/><stop offset="1" stop-color="#eac466"/></linearGradient>`,
    `<filter id="shadow" x="-15%" y="-30%" width="140%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>`,
    `<marker id="arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 6 4 1 7" fill="none" stroke="#7a8173" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>`,
    `</defs>`,
    `<rect width="1040" height="${height}" rx="20" fill="#f8f7f2"/>`,
    `<g font-family="'Segoe UI', Inter, Arial, sans-serif">`,
    `<text x="40" y="54" font-size="25" font-weight="600" letter-spacing="-.6" fill="#272e27">${escape(diagram.title)}</text>`,
    `<text x="40" y="81" font-size="15" fill="#62695e">${escape(diagram.subtitle)}</text>`,
    `<path d="M40 102H1000" stroke="#dedfd5"/>`,
  ];
}

function block(svg, label, index, x, y, width, height, tone = "paper") {
  const dark = tone === "ink";
  const edge = dark ? "#171d18" : tone === "ochre" ? "#b49141" : "#cecec1";
  const foreground = dark ? "#fffdf4" : "#293026";
  const lines = lineBreaks.get(label) ?? [label];
  // An actual lower face plus a narrow top highlight gives quiet physical depth.
  svg.push(`<rect x="${x + 3}" y="${y + 14}" width="${width}" height="${height}" rx="12" fill="#333c2a" opacity=".12" filter="url(#shadow)"/>`);
  svg.push(`<rect x="${x}" y="${y + 6}" width="${width}" height="${height}" rx="12" fill="${edge}"/>`);
  svg.push(`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="12" fill="url(#${tone})" stroke="${dark ? "#363d34" : tone === "ochre" ? "#d6b460" : "#ddded3"}"/>`);
  svg.push(`<path d="M${x + 13} ${y + 1}H${x + width - 13}" stroke="${dark ? "#636b5d" : "#ffffff"}" stroke-linecap="round" opacity=".75"/>`);
  svg.push(`<text x="${x + 19}" y="${y + height / 2 + 5}" font-size="13" font-weight="500" fill="${dark ? "#c5cebd" : "#666e5c"}">${String(index + 1).padStart(2, "0")}</text>`);
  svg.push(`<path d="M${x + 47} ${y + height / 2 - 13}v26" stroke="${dark ? "#56604f" : tone === "ochre" ? "#c9a950" : "#dcded2"}"/>`);
  lines.forEach((line, i) => svg.push(`<text x="${x + 64}" y="${y + height / 2 + 6 - (lines.length - 1) * 11 + i * 22}" font-size="18" font-weight="500" letter-spacing="-.25" fill="${foreground}">${escape(line)}</text>`));
}

function connector(svg, d) {
  svg.push(`<path d="${d}" fill="none" stroke="#7a8173" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)"/>`);
}

for (const diagram of diagrams) {
  const svg = start(diagram, diagram.stacked ? 688 : 648);
  if (diagram.stacked) {
    // A single descending spine makes the dependency model read as layers.
    diagram.labels.forEach((label, i) => {
      const x = 162 + i * 24;
      const y = 134 + i * 102;
      if (i) connector(svg, `M${x + 280} ${y - 24}V${y - 8}`);
      block(svg, label, i, x, y, 600, 70, i === 0 ? "ink" : i === 4 ? "ochre" : "paper");
    });
  } else {
    const position = (i) => {
      const row = Math.floor(i / 3);
      const col = row % 2 === 0 ? i % 3 : 2 - i % 3;
      return { x: 40 + col * 330, y: 136 + row * 126, row, col };
    };
    for (let i = 0; i < diagram.labels.length - 1; i++) {
      const a = position(i), b = position(i + 1);
      if (a.row !== b.row) connector(svg, `M${a.x + 150} ${a.y + 90}V${b.y - 9}`);
      else if (a.col < b.col) connector(svg, `M${a.x + 301} ${a.y + 42}H${b.x - 8}`);
      else connector(svg, `M${a.x - 1} ${a.y + 42}H${b.x + 308}`);
    }
    diagram.labels.forEach((label, i) => {
      const { x, y } = position(i);
      block(svg, label, i, x, y, 300, 84, i === 0 ? "ink" : i === diagram.labels.length - 1 ? "ochre" : "paper");
    });
  }
  svg.push(`</g>`, `</svg>`);
  fs.writeFileSync(path.join(root, "assets", diagram.file), svg.join("\n") + "\n");
  console.log("Generated assets/" + diagram.file);
}
