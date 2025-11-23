"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/app/header.css";

const MENU = [
  { id: "about", label: "About" },
  { id: "visions", label: "Visions" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(MENU[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const touchStartX = useRef<number | null>(null);
  const dragging = useRef(false);

  /* ---------------------------
     Active menu on scroll
  ---------------------------- */
  useEffect(() => {
    const updateActive = () => {
      const offset = 120;
      let found: string | null = null;

      for (const item of MENU) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const r = el.getBoundingClientRect();
        if (r.top - offset <= 0 && r.bottom - offset > 0) {
          found = item.id;
          break;
        }
      }

      if (found) setActive(found);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      updateActive();
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------------------
     Smooth Scroll
  ---------------------------- */
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 100;
    const rect = el.getBoundingClientRect();
    const pos = rect.top + window.scrollY - offset;

    window.scrollTo({ top: pos, behavior: "smooth" });
  };

  // ← FIX: set active on click so mobile immediately reflects selection
  const onMenuClick = (id: string) => {
    setActive(id); // set active immediately
    scrollToId(id);
    setMobileOpen(false);
  };

  /* ---------------------------
     Swipe-to-close mobile panel
  ---------------------------- */
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel) return;

    const onStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      dragging.current = true;
      panel.style.transition = "none";
    };

    const onMove = (e: TouchEvent) => {
      if (!dragging.current || touchStartX.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;

      if (dx < 0) {
        panel.style.transform = `translateX(${dx}px)`;
        if (overlay) overlay.style.opacity = `${1 - Math.abs(dx) / 250}`;
      }
    };

    const onEnd = () => {
      dragging.current = false;
      panel.style.transition = "";
      panel.style.transform = "";

      if (overlay) overlay.style.opacity = "";

      if (
        touchStartX.current &&
        touchStartX.current - (panel.getBoundingClientRect().left || 0) > 80
      ) {
        setMobileOpen(false);
      }

      touchStartX.current = null;
    };

    panel.addEventListener("touchstart", onStart, { passive: true });
    panel.addEventListener("touchmove", onMove, { passive: true });
    panel.addEventListener("touchend", onEnd);

    return () => {
      panel.removeEventListener("touchstart", onStart);
      panel.removeEventListener("touchmove", onMove);
      panel.removeEventListener("touchend", onEnd);
    };
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="site-inner">
          {/* LOGO + TITLE */}
          <div className="brand-row">
            <img
              src="/images/logos/logo-2.svg"
              alt="Gnarly Troop Logo"
              width={272}
              height={72}
              className="logo"
            />
          </div>

          {/* DESKTOP MENU */}
          <nav className="desktop-menu">
            {MENU.map((m) => (
              <button
                key={m.id}
                onClick={() => onMenuClick(m.id)}
                className={`menu-item ${active === m.id ? "active" : ""}`}
              >
                {m.label}
              </button>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg className="hamb" viewBox="0 0 26 16">
              <rect className="line top" x="0" y="0" width="26" height="2" />
              <rect className="line mid" x="0" y="7" width="26" height="2" />
              <rect className="line bot" x="0" y="14" width="26" height="2" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU LAYER */}
      <div
        ref={overlayRef}
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          ref={panelRef}
          className={`mobile-panel ${mobileOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-head">
            <img src="/images/logos/logo-2.svg" width={120} />
            <button className="close-btn" onClick={() => setMobileOpen(false)}>
              ✕
            </button>
          </div>

          <div className="mobile-list">
            {MENU.map((m) => (
              // ← FIX: include active class for mobile items
              <button
                key={m.id}
                onClick={() => onMenuClick(m.id)}
                className={`mobile-item ${active === m.id ? "active" : ""}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SPACER */}
      <div className="header-spacer" />
    </>
  );
}
