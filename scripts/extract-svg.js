import { readFileSync, writeFileSync } from 'fs';

const html = readFileSync('/vercel/share/v0-project/index.html', 'utf-8');

const svgStart = html.indexOf('<svg xmlns=');
const svgEnd = html.indexOf('</svg>', svgStart) + '</svg>'.length;

if (svgStart === -1 || svgEnd <= svgStart) {
  console.error('Could not find SVG in index.html');
  process.exit(1);
}

const svgContent = html.substring(svgStart, svgEnd);
writeFileSync('/vercel/share/v0-project/public/moscow.svg', svgContent, 'utf-8');
console.log(`Extracted SVG (${svgContent.length} chars) to public/moscow.svg`);
