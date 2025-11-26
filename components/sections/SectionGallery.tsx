"use client";

import React, { useState } from "react";
import PopupLightbox from "./PopupLightbox";
import styles from "@/app/gallery.module.css";

type Section = {
  id: string; // folder slug
  title: string;
  count: number;
  cover?: string;
};

// YOUR SECTIONS
const sections: Section[] = [

  { id: "climate", title: "Climate Excellence", count: 1 },
  { id: "community", title: "Community Engagement", count: 1 },
  { id: "cultural", title: "Cultural Excellence", count: 1 },
  { id: "cooperation", title: "Cooperation Excellence", count: 2 },
  { id: "sports", title: "Sports & Adventure", count: 2 },
  { id: "youth", title: "Youth Program", count: 2 },
  { id: "globalmeet", title: "Global Meet", count: 2 },
  { id: "countryshowcase", title: "Country Showcase", count: 2 },
  { id: "education", title: "Education & Innovation", count: 2 },
];

export default function GallerySections() {
  const [openSection, setOpenSection] = useState<Section | null>(null);

  const scrollLeft = () => {
    const el = document.getElementById("sectionsCarousel");
    el?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    const el = document.getElementById("sectionsCarousel");
    el?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className={styles.galleryWrapper} aria-label="Gallery sections">
      <h2 className={styles.pageHeading}>Gallery</h2>

      {/* CAROUSEL WRAPPER */}
      <div className={styles.sectionsCarouselWrapper}>
        <button className={styles.carouselArrowLeft} onClick={scrollLeft}>
          ‹
        </button>

        {/* HORIZONTAL SCROLLABLE LIST */}
        <div id="sectionsCarousel" className={styles.sectionsCarousel}>
          {sections.map((s) => {
            const cover =
              s.cover ?? `/images/gallery/${s.id}/1.jpg`;

            return (
              <button
                key={s.id}
                className={styles.sectionCard}
                onClick={() => setOpenSection(s)}
              >
                <div className={styles.cardImageWrap}>
                  <img
                    src={cover}
                    alt={s.title}
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardCount}>{s.count} Images</p>
                </div>
              </button>
            );
          })}
        </div>

        <button className={styles.carouselArrowRight} onClick={scrollRight}>
          ›
        </button>
      </div>

      {/* POPUP */}
      {openSection && (
        <PopupLightbox
          section={openSection}
          onClose={() => setOpenSection(null)}
        />
      )}
    </section>
  );
}
