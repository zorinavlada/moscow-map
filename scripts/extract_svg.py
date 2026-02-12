import re

with open("/vercel/share/v0-project/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find the SVG tag embedded in index.html
match = re.search(r'(<svg xmlns="http://www.w3.org/2000/svg".*?</svg>)', html, re.DOTALL)

if match:
    svg_content = match.group(1)
    with open("/vercel/share/v0-project/public/moscow.svg", "w", encoding="utf-8") as out:
        out.write(svg_content)
    print(f"Extracted SVG: {len(svg_content)} characters")
else:
    print("ERROR: SVG not found in index.html")
