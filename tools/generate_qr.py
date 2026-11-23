"""Create print QR assets from a confirmed live GitHub Pages HTTPS URL.
Authoring only: Python + reportlab + Pillow. No website runtime dependency.
Usage: python tools/generate_qr.py https://ACCOUNT.github.io/REPOSITORY/
"""
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from reportlab.graphics.barcode.qr import QrCodeWidget
from PIL import Image, ImageDraw

url = sys.argv[1]
p = urlparse(url)
if p.scheme != 'https' or not p.hostname or not p.hostname.endswith('.github.io') or p.query or p.fragment:
    raise SystemExit('Supply the confirmed, canonical GitHub Pages HTTPS webpage URL.')
with urlopen(Request(url, headers={'User-Agent': 'AGU-Poster-QR'}), timeout=30) as response:
    if response.status != 200 or response.geturl() != url:
        raise SystemExit('The exact destination must be live with HTTP 200 before QR generation.')
q = QrCodeWidget(url, barLevel='Q')
q.qr.make()
matrix = q.qr.modules
border = 4
side = len(matrix) + border * 2
scale = 56
out = Path(__file__).resolve().parents[1] / 'qr'
out.mkdir(exist_ok=True)
image = Image.new('RGB', (side*scale, side*scale), 'white')
draw = ImageDraw.Draw(image)
paths = []
for row, modules in enumerate(matrix):
    for col, dark in enumerate(modules):
        if dark:
            x, y = col+border, row+border
            draw.rectangle((x*scale, y*scale, (x+1)*scale-1, (y+1)*scale-1), fill='black')
            paths.append(f'M{x},{y}h1v1h-1z')
image.save(out/'agu2026-qr.png', dpi=(600,600))
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}" width="50mm" height="50mm" shape-rendering="crispEdges" role="img" aria-label="Scan to watch the research introduction"><rect width="{side}" height="{side}" fill="white"/><path d="{"".join(paths)}" fill="black"/></svg>\n'
(out/'agu2026-qr.svg').write_text(svg, encoding='utf-8')
(out/'destination.txt').write_text(url+'\n', encoding='utf-8')
print(f'Generated SVG and {side*scale} x {side*scale} PNG, Q error correction, 4-module quiet zone. Destination: {url}')
