"use client";
import React from "react";

type Partner = {
  img: string;
  text: string;
};

export default function SectionPartners() {
  const partners: Partner[] = [
    // { img: "/images/p1.jpg", text: "Partner 1" },
    // { img: "/images/p2.jpg", text: "Partner 2" },
  ];

  return (
    <section id="partners" className="reveal">
      <h3>Partners</h3>
      <div
        className="partners-track"
        style={{ display: "flex", gap: 12, overflowX: "auto" }}
      >
        {partners.map((p, i) => (
          <div
            key={i}
            style={{
              minWidth: 180,
              padding: 12,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <img
              src={p.img}
              alt={p.text}
              style={{ width: "100%", height: 80, objectFit: "cover" }}
            />
            <div>{p.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
