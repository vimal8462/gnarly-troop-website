"use client";
import React, { useRef } from "react";

export default function SectionVisions() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  return (
    <section id="visions" className="reveal">
      <h3>4C's Vision</h3>
      <div style={{ display: "flex", gap: 12, overflowX: "auto" }} ref={rowRef}>
        {["Climate", "Community", "Culture", "Cooperation"].map((t, i) => (
          <div
            key={i}
            className="card-small"
            style={{ minWidth: 240, padding: 16 }}
          >
            <h4>{t}</h4>
            <p className="muted">Details…</p>
          </div>
        ))}
      </div>
    </section>
  );
}
