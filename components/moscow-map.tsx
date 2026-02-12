"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Maniac } from "@/lib/maniacs";
import { maniacs } from "@/lib/maniacs";
import type panzoomType from "panzoom";

const BOUNDS = {
  minLon: 36.8031,
  maxLon: 37.9708,
  minLat: 55.1422,
  maxLat: 56.0212,
};

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 1000;

export default function MoscowMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pzRef = useRef<ReturnType<typeof panzoomType> | null>(null);
  const [activeManiac, setActiveManiac] = useState<Maniac | null>(null);
  const [cardPos, setCardPos] = useState({ left: 0, top: 0 });

  const showCard = useCallback((maniac: Maniac, event: MouseEvent | TouchEvent) => {
    const target = event.target as Element;
    const rect = target.getBoundingClientRect();
    let left = rect.right + 15;
    let top = rect.top - 20;

    if (left + 280 > window.innerWidth) {
      left = rect.left - 295;
    }

    left = Math.max(10, left);
    top = Math.max(10, top);

    setActiveManiac(maniac);
    setCardPos({ left, top: 10 });

    // Adjust after render
    requestAnimationFrame(() => {
      if (cardRef.current) {
        const cardH = cardRef.current.offsetHeight;
        const winH = window.innerHeight;
        if (top + cardH > winH - 10) {
          top = Math.max(10, winH - cardH - 10);
        }
        top = Math.max(10, top);
        setCardPos({ left, top });
      }
    });
  }, []);

  const hideCard = useCallback(() => {
    setActiveManiac(null);
  }, []);

  useEffect(() => {
    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    // Load SVG
    fetch("/moscow.svg")
      .then((res) => res.text())
      .then((svgText) => {
        mapContainer.innerHTML = svgText;
        const svg = mapContainer.querySelector("svg");
        if (!svg) return;

        // Add district labels
        addDistrictLabels(svg);

        // Add markers
        addMarkers(svg);

        // Init panzoom
        import("panzoom").then((mod) => {
          const panzoom = mod.default;
          const pz = panzoom(svg, {
            maxZoom: 5,
            minZoom: 0.5,
            initialZoom: 1,
            bounds: true,
            boundsPadding: 0.1,
          });
          pzRef.current = pz;
        });
      });

    // Click outside marker to close card
    const handleGlobalClick = (e: MouseEvent) => {
      if (!(e.target as Element).classList.contains("marker")) {
        setActiveManiac(null);
      }
    };
    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      if (pzRef.current) {
        pzRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addDistrictLabels(svg: SVGSVGElement) {
    const districtsGroup = svg.querySelector("#districts");
    if (!districtsGroup) return;

    const labelsGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    labelsGroup.setAttribute("id", "district-labels");

    const seen = new Set<string>();

    districtsGroup.querySelectorAll("path[data-name]").forEach((path) => {
      const name = path.getAttribute("data-name");
      if (!name || seen.has(name)) return;
      seen.add(name);

      const bbox = (path as SVGGraphicsElement).getBBox();
      const area = bbox.width * bbox.height;

      if (area < 800) return;

      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;

      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", String(cx));
      label.setAttribute("y", String(cy));
      label.setAttribute("class", "district-label");
      label.textContent = name;

      labelsGroup.appendChild(label);
    });

    const markersGroup = svg.querySelector("#markers");
    svg.insertBefore(labelsGroup, markersGroup);
  }

  function addMarkers(svg: SVGSVGElement) {
    const markersGroup = svg.querySelector("#markers");
    if (!markersGroup) return;

    const viewBox = svg.viewBox.baseVal;

    maniacs.forEach((m) => {
      const x =
        ((m.coords[0] - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) *
        (viewBox.width || SVG_WIDTH);
      const y =
        ((BOUNDS.maxLat - m.coords[1]) / (BOUNDS.maxLat - BOUNDS.minLat)) *
        (viewBox.height || SVG_HEIGHT);

      const victims = typeof m.victims === "number" ? m.victims : 10;
      const radius = Math.max(4, Math.min(12, 3 + victims / 5));

      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(y));
      circle.setAttribute("r", String(radius));
      circle.setAttribute("class", "marker");
      circle.setAttribute("data-id", String(m.id));

      circle.addEventListener("mouseenter", (e) => showCard(m, e));
      circle.addEventListener("mouseleave", () => hideCard());

      circle.addEventListener("click", (e) => {
        e.stopPropagation();
        showCard(m, e);
      });
      circle.addEventListener(
        "touchstart",
        (e) => {
          e.stopPropagation();
        },
        { passive: true }
      );

      markersGroup.appendChild(circle);

      // Name label
      const fontSize = Math.max(6, Math.min(14, radius * 1.2));
      const estimatedTextWidth = m.name.length * fontSize * 0.6;
      const svgWidth = viewBox.width || SVG_WIDTH;
      const overflowsRight = x + radius + 3 + estimatedTextWidth > svgWidth;
      const labelX = overflowsRight ? x - radius - 3 : x + radius + 3;
      const labelY = y + fontSize / 3;

      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", String(labelX));
      label.setAttribute("y", String(labelY));
      label.setAttribute("class", "marker-label");
      label.setAttribute("font-size", fontSize + "px");
      if (overflowsRight) {
        label.setAttribute("text-anchor", "end");
      }
      label.textContent = m.name;

      markersGroup.appendChild(label);
    });
  }

  const handleZoomIn = () => {
    if (pzRef.current) {
      pzRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (pzRef.current) {
      pzRef.current.zoomOut();
    }
  };

  return (
    <div className="container">
      <header>
        <div className="logo">{"Слепая зона"}</div>
        <div className="stats">
          <span>{"20"}</span> {"маньяков"} {"·"} <span>{"220+"}</span>{" "}
          {"жертв"} {"·"} {"1921–2013"}
        </div>
      </header>

      <div className="map-container">
        <div id="map" ref={mapRef} />
      </div>

      <footer>
        <div className="controls">
          <button id="zoom-out" onClick={handleZoomOut} aria-label="Уменьшить">
            {"\u2212"}
          </button>
          <button id="zoom-in" onClick={handleZoomIn} aria-label="Увеличить">
            {"+"}
          </button>
        </div>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-dot" />
            {" Размер точки = количество жертв"}
          </span>
          <span className="legend-divider">{"·"}</span>
          <span className="legend-item">
            {"Наведите на точку для подробностей"}
          </span>
        </div>
      </footer>

      {/* Card */}
      <div
        className={`card ${activeManiac ? "visible" : ""}`}
        id="card"
        ref={cardRef}
        style={{ left: cardPos.left, top: cardPos.top }}
      >
        {activeManiac?.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="card-photo"
            src={activeManiac.photo}
            alt={activeManiac.name}
            style={{
              objectPosition: activeManiac.photoPosition || "center 20%",
            }}
          />
        ) : null}
        <div className="card-body">
          <div className="card-address">{activeManiac?.address}</div>
          <div className="card-name">{activeManiac?.name}</div>
          <div className="card-nickname">
            {activeManiac?.nickname ? `\u00AB${activeManiac.nickname}\u00BB` : ""}
          </div>
          <div className="card-meta">
            {activeManiac
              ? `${activeManiac.years} · `
              : ""}
            <span className="card-victims">
              {activeManiac ? `${activeManiac.victims} жертв` : ""}
            </span>
          </div>
          <div className="card-description">{activeManiac?.description}</div>
          <div className="card-sentence">{activeManiac?.sentence || ""}</div>
        </div>
      </div>
    </div>
  );
}
