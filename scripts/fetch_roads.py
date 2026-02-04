#!/usr/bin/env python3
"""
Скачивает основные дороги Москвы через Overpass API.
Сохраняет в GeoJSON.
"""

import json
import requests

# Overpass API запрос: основные дороги внутри МКАД
OVERPASS_QUERY = """
[out:json][timeout:120];
area["name"="Москва"]["admin_level"="4"]->.moscow;
(
  way["highway"="motorway"](area.moscow);
  way["highway"="trunk"](area.moscow);
  way["highway"="primary"](area.moscow);
  way["highway"="secondary"](area.moscow);
);
out geom;
"""

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

def fetch_roads():
    print("Запрашиваю данные с Overpass API...")
    print("Это может занять 1-2 минуты...")

    response = requests.post(OVERPASS_URL, data={"data": OVERPASS_QUERY})

    if response.status_code != 200:
        print(f"Ошибка: {response.status_code}")
        return None

    data = response.json()
    print(f"Получено {len(data.get('elements', []))} элементов")

    return data

def osm_to_geojson(osm_data):
    """Конвертирует OSM JSON в GeoJSON."""
    features = []

    for element in osm_data.get("elements", []):
        if element["type"] == "way" and "geometry" in element:
            coords = [[p["lon"], p["lat"]] for p in element["geometry"]]

            feature = {
                "type": "Feature",
                "properties": {
                    "highway": element.get("tags", {}).get("highway", ""),
                    "name": element.get("tags", {}).get("name", "")
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                }
            }
            features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features
    }

if __name__ == "__main__":
    osm_data = fetch_roads()

    if osm_data:
        geojson = osm_to_geojson(osm_data)

        output_path = "/Users/vladazorina/Desktop/Personal-Super-Agent-Ru-main/moscow-map/data/roads.geojson"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(geojson, f, ensure_ascii=False)

        print(f"Сохранено {len(geojson['features'])} дорог в {output_path}")
