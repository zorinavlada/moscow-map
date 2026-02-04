#!/usr/bin/env python3
"""
Конвертирует GeoJSON дорог и районов в SVG.
"""

import json
import math

# Параметры SVG
WIDTH = 1200
HEIGHT = 1000
PADDING = 20

# Файлы
ROADS_FILE = "/Users/vladazorina/Desktop/Personal-Super-Agent-Ru-main/moscow-map/data/roads.geojson"
DISTRICTS_FILE = "/Users/vladazorina/Desktop/Personal-Super-Agent-Ru-main/moscow-map/data/districts.geojson"
OUTPUT_FILE = "/Users/vladazorina/Desktop/Personal-Super-Agent-Ru-main/moscow-map/moscow.svg"


def load_geojson(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def get_bounds(roads, districts):
    """Находит границы всех данных."""
    min_lon, max_lon = float("inf"), float("-inf")
    min_lat, max_lat = float("inf"), float("-inf")

    for feature in roads.get("features", []):
        geom = feature.get("geometry", {})
        if geom.get("type") == "LineString":
            for lon, lat in geom.get("coordinates", []):
                min_lon = min(min_lon, lon)
                max_lon = max(max_lon, lon)
                min_lat = min(min_lat, lat)
                max_lat = max(max_lat, lat)

    for feature in districts.get("features", []):
        geom = feature.get("geometry", {})
        coords_list = []
        if geom.get("type") == "Polygon":
            coords_list = [geom.get("coordinates", [[]])[0]]
        elif geom.get("type") == "MultiPolygon":
            for poly in geom.get("coordinates", []):
                if poly:
                    coords_list.append(poly[0])

        for coords in coords_list:
            for lon, lat in coords:
                min_lon = min(min_lon, lon)
                max_lon = max(max_lon, lon)
                min_lat = min(min_lat, lat)
                max_lat = max(max_lat, lat)

    return min_lon, max_lon, min_lat, max_lat


def project(lon, lat, bounds):
    """Проецирует координаты на SVG."""
    min_lon, max_lon, min_lat, max_lat = bounds

    # Масштабирование
    x = (lon - min_lon) / (max_lon - min_lon) * (WIDTH - 2 * PADDING) + PADDING
    y = (max_lat - lat) / (max_lat - min_lat) * (HEIGHT - 2 * PADDING) + PADDING

    return round(x, 2), round(y, 2)


def coords_to_path(coords, bounds):
    """Преобразует координаты в SVG path."""
    if not coords:
        return ""

    points = [project(lon, lat, bounds) for lon, lat in coords]
    path_parts = [f"M{points[0][0]},{points[0][1]}"]

    for x, y in points[1:]:
        path_parts.append(f"L{x},{y}")

    return "".join(path_parts)


def generate_svg(roads, districts, bounds):
    """Генерирует SVG."""
    svg_parts = []

    # Header
    svg_parts.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="{WIDTH}" height="{HEIGHT}">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#0A0A0A"/>

  <!-- Районы -->
  <g id="districts" fill="none" stroke="#1a1a1a" stroke-width="0.5">''')

    # Районы
    for feature in districts.get("features", []):
        geom = feature.get("geometry", {})
        name = feature.get("properties", {}).get("NAME", "")

        paths = []
        if geom.get("type") == "Polygon":
            paths.append(coords_to_path(geom["coordinates"][0], bounds))
        elif geom.get("type") == "MultiPolygon":
            for poly in geom.get("coordinates", []):
                if poly:
                    paths.append(coords_to_path(poly[0], bounds))

        for path_d in paths:
            if path_d:
                svg_parts.append(f'    <path d="{path_d}" data-name="{name}"/>')

    svg_parts.append('  </g>\n')

    # Дороги по типам
    road_styles = {
        "motorway": {"stroke": "#333", "width": "1.5"},
        "trunk": {"stroke": "#2a2a2a", "width": "1.2"},
        "primary": {"stroke": "#222", "width": "0.8"},
        "secondary": {"stroke": "#1a1a1a", "width": "0.5"},
    }

    svg_parts.append('  <!-- Дороги -->')

    for highway_type, style in road_styles.items():
        svg_parts.append(f'  <g id="roads-{highway_type}" fill="none" stroke="{style["stroke"]}" stroke-width="{style["width"]}" stroke-linecap="round">')

        for feature in roads.get("features", []):
            if feature.get("properties", {}).get("highway") == highway_type:
                geom = feature.get("geometry", {})
                if geom.get("type") == "LineString":
                    path_d = coords_to_path(geom["coordinates"], bounds)
                    if path_d:
                        svg_parts.append(f'    <path d="{path_d}"/>')

        svg_parts.append('  </g>')

    # Placeholder для маркеров
    svg_parts.append('''
  <!-- Маркеры маньяков -->
  <g id="markers">
    <!-- Маркеры будут добавлены через JavaScript -->
  </g>
</svg>''')

    return "\n".join(svg_parts)


if __name__ == "__main__":
    print("Загружаю данные...")
    roads = load_geojson(ROADS_FILE)
    districts = load_geojson(DISTRICTS_FILE)

    print(f"Дорог: {len(roads.get('features', []))}")
    print(f"Районов: {len(districts.get('features', []))}")

    print("Вычисляю границы...")
    bounds = get_bounds(roads, districts)
    print(f"Границы: lon[{bounds[0]:.4f}, {bounds[1]:.4f}], lat[{bounds[2]:.4f}, {bounds[3]:.4f}]")

    print("Генерирую SVG...")
    svg = generate_svg(roads, districts, bounds)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(svg)

    print(f"Сохранено: {OUTPUT_FILE}")
    print(f"Размер: {len(svg) / 1024:.1f} KB")
