import { readFileSync } from "fs";
import { resolve } from "path";

let cachedSvg: string | null = null;

export async function GET() {
  if (!cachedSvg) {
    const htmlPath = resolve(process.cwd(), "index.html");
    const html = readFileSync(htmlPath, "utf-8");

    const startMarker = '<svg xmlns="http://www.w3.org/2000/svg"';
    const endMarker = "</svg>";

    const startIdx = html.indexOf(startMarker);
    const endIdx = html.indexOf(endMarker, startIdx);

    if (startIdx === -1 || endIdx === -1) {
      return new Response("SVG not found", { status: 500 });
    }

    cachedSvg = html.substring(startIdx, endIdx + endMarker.length);
  }

  return new Response(cachedSvg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
