// HeroMap.jsx (Next.js React component - no Tailwind)
// Save this file as: components/HeroMap.jsx
// Also save the accompanying CSS as: components/HeroMap.css (contents shown below)

import React from "react";
import "@/app/about.css";
import { color } from "framer-motion";

/**
 * HeroMap
 * - Uses the image at: /mnt/data/Actual.png (replace with '/Actual.png' if you move the image to /public)
 * - No Tailwind — plain CSS in HeroMap.css
 */
export default function SectionAbout() {
  return (
    <section
      className="hero-map-root"
      role="region"
      aria-label="Welcome to India map hero"
    >
      <div className="hero-map-viewport">
        <img
          src="/images/sections/bg-about-country-maps.png"
          alt="World map with India highlighted"
          className="hero-map-image"
          aria-hidden="true"
        />

        <div className="hero-content">
          <h1 className="hero-title-hi">स्वागतम् मम राष्ट्रे भारतवर्षे !</h1>
          <h2 className="hero-title-en">Welcome to My Country, India</h2>
          {/* <p className="hero-sub">Explore Bharat with Gnarly Troop</p> */}
          <p className="hero-sub">
            <span className="hero-sub-text">
              Explore Bharat with Gnarly Troop
            </span>
            <span className="hero-sub-estd">EST. 2013</span>
          </p>

          <div className="legend">
            <div className="legend-bar" aria-hidden>
              <span className="dot dot-left" />
              <span className="dot dot-center" />
              <span className="dot dot-right" />
            </div>

            <div className="legend-labels">
              <span className="legend-item" style={{ color: "var(--pink)" }}>
                {/* <span className="swatch sw-left" /> */}
                My Country
              </span>
              <span className="legend-item" style={{ color: "var(--orange)" }}>
                {/* <span className="swatch sw-center" /> */}
                My Responsibility
              </span>
              <span className="legend-item" style={{ color: "var(--blue)" }}>
                {/* <span className="swatch sw-right" /> */}
                My Pride
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  HeroMap.css
  Save this content into: components/HeroMap.css
*/
