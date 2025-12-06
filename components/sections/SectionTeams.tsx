"use client";

// components/SectionTeams.tsx
import React, { useMemo } from "react";
import styles from "@/app/leadership/SectionTeams.module.css";
import members from "@/app/leadership/members-data.js";

export interface Person {
  id: string; // <-- string type
  name: string;
  role?: string;
  img?: string;
  href?: string | null;
  dataType?: string | null;
  bio?: string | null;
  priority?: string | number | null;
  [key: string]: any;
}

const DEFAULT_HIGH_PRIORITY = 999999;

// Convert priority to number safely
function getPriority(p: Person): number {
  if (p.priority == null) return DEFAULT_HIGH_PRIORITY;
  const n = Number(p.priority);
  return Number.isFinite(n) ? n : DEFAULT_HIGH_PRIORITY;
}

// Build URL using string id
function resolveHref(p: Person): string {
  if (p.bio && typeof p.bio === "string" && p.bio.trim() !== "") {
    return `/leadership/${String(p.id)}`;
  }
  return "#";
}

export default function SectionTeams() {
  const sectionA = useMemo(() => {
    return (members as Person[])
      .filter((p) => p.dataType === "global advisory and governing board")
      .slice()
      .sort((a, b) => getPriority(a) - getPriority(b));
  }, []);

  const sectionB = useMemo(() => {
    return (members as Person[])
      .filter((p) => p.dataType === "executive leadership committee members")
      .slice()
      .sort((a, b) => getPriority(a) - getPriority(b));
  }, []);

  const sectionC = useMemo(() => {
    return (members as Person[])
      .filter(
        (p) =>
          p.dataType ===
          "gnarly troop council for support & strategic resources"
      )
      .slice()
      .sort((a, b) => getPriority(a) - getPriority(b));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1 className={styles.heading}>Leadership</h1>

          <p className={styles.desc}>
            <b>Gnarly Founder:</b> One of the best indicators of success is the
            capacity to react swiftly and forcefully to setbacks in life. Not
            your athletic prowess, beauty, or the fact that you took first place
            in a pie-eating contest in year nine... It's an area I find
            absolutely fascinating because it predicts your overall gnarly
            success and happiness throughout your lifespan. Your capacity to
            adapt in troop and respond to the changing seasons of life. I've
            come to this conclusion about what it takes to develop resilience as
            a result of everything I've gone through, everyone I've talked to,
            and everything I've learned. We appreciate your participation in
            Gnarly Troop today.
          </p>
        </main>
      </div>

      {/* -------------------------------- */}
      {/* 1 — GLOBAL ADVISORY AND GOVERNING BOARD */}
      {/* -------------------------------- */}
      <section aria-labelledby="section-a">
        <hr className={styles.separator} />
        <h2 id="section-a" className={styles.subHeading}>
          GLOBAL ADVISORY AND GOVERNING BOARD
        </h2>

        <div className={styles.wrapper2}>
          <div className={styles.grid}>
            {sectionA.map((p: Person) => (
              <a
                key={p.id}
                href={resolveHref(p)}
                className={`${styles.cardLink} ${
                  resolveHref(p) === "#" ? styles.disabledLink : ""
                }`}
              >
                <article
                  className={styles.card}
                  aria-label={p.name}
                  id={`leadership-${p.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={p.img || "/placeholder-profile.png"}
                      alt={p.name}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardText}>
                    <h3 className={styles.personName}>{p.name}</h3>
                    <p className={styles.personRole}>{p.role}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* 2 — EXECUTIVE MEMBERS */}
      {/* -------------------------------- */}
      <section aria-labelledby="section-b">
        <hr className={styles.separator} />
        <h2 id="section-b" className={styles.subHeading}>
          EXECUTIVE LEADERSHIP COMMITTEE MEMBERS
        </h2>

        <div className={styles.wrapper2}>
          <div className={styles.grid}>
            {sectionB.map((p: Person) => (
              <a
                key={p.id}
                href={resolveHref(p)}
                className={`${styles.cardLink} ${
                  resolveHref(p) === "#" ? styles.disabledLink : ""
                }`}
              >
                <article
                  className={styles.card}
                  aria-label={p.name}
                  id={`leadership-${p.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={p.img || "/placeholder-profile.png"}
                      alt={p.name}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardText}>
                    <h3 className={styles.personName}>{p.name}</h3>
                    <p className={styles.personRole}>{p.role}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* 3 — GNARLY TROOP COUNCIL FOR SUPPORT & STRATEGIC RESOURCES */}
      {/* -------------------------------- */}
      <section aria-labelledby="section-c">
        <hr className={styles.separator} />
        <h2 id="section-c" className={styles.subHeading}>
          GNARLY TROOP COUNCIL FOR SUPPORT & STRATEGIC RESOURCES
        </h2>

        <div className={styles.wrapper2}>
          <div className={styles.grid}>
            {sectionC.map((p: Person) => (
              <a
                key={p.id}
                href={resolveHref(p)}
                className={`${styles.cardLink} ${
                  resolveHref(p) === "#" ? styles.disabledLink : ""
                }`}
              >
                <article
                  className={styles.card}
                  aria-label={p.name}
                  id={`leadership-${p.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={p.img || "/placeholder-profile.png"}
                      alt={p.name}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardText}>
                    <h3 className={styles.personName}>{p.name}</h3>
                    <p className={styles.personRole}>{p.role}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
