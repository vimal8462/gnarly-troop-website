// components/SectionTeams.tsx
import React, { useMemo } from "react";
import styles from "@/app/team2/SectionTeams.module.css";

// single merged data file
import members from "@/app/team/members-data.js";

interface Person {
  id: number | string;
  name: string;
  role?: string;
  img?: string;
  href?: string | null;
  dataType?: string | null; // "leaders-data" or "members-data"
  priority?: number | string | null;
  [key: string]: any;
}

const DEFAULT_HIGH_PRIORITY = 999999;

function getPriority(p: Person): number {
  if (p.priority == null) return DEFAULT_HIGH_PRIORITY;
  if (typeof p.priority === "number") return p.priority;
  const n = Number(p.priority);
  return Number.isFinite(n) ? n : DEFAULT_HIGH_PRIORITY;
}

function resolveHref(p: Person): string {
  //   if (p.href && typeof p.href === "string" && p.href.trim() !== "")
  //     // return p.href;
  //     return `/team2/${p.id.toString()}`;
  //     if (p.id != null) return `#${p.id.toString()}`;
  //     return "#";

  if (p.bio && typeof p.bio === "string" && p.bio.trim() !== "")
    return `/team2/${p.id.toString()}`;
  return "#";
}

export default function SectionTeams() {
  // split and sort using useMemo to avoid re-computation on each render
  const leaders = useMemo(() => {
    return (members as Person[])
      .filter((p) => p.dataType === "global advisory and governing board")
      .slice() // copy before sort
      .sort((a, b) => getPriority(a) - getPriority(b));
  }, []);

  const membersList = useMemo(() => {
    return (members as Person[])
      .filter((p) => p.dataType === "executive leadership committee members")
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

      {/* ========================================================= */}
      {/* === 1. Global Advisory and Governing Board ========================== */}
      {/* ========================================================= */}
      <section aria-labelledby="gnarly-global-leadership">
        <hr className={styles.separator} />
        <h2 id="gnarly-global-leadership" className={styles.subHeading}>
          Global Advisory and Governing Board
        </h2>

        <div className={styles.wrapper2}>
          <div className={styles.grid}>
            {leaders.map((p: Person, i: number) => (
              <a
                key={i}
                href={resolveHref(p)}
                className={`${styles.cardLink} ${
                  resolveHref(p) === "#" ? styles.disabledLink : ""
                }`}
                // allow open in new tab for external links
                // {...(p.href && p.href.trim() !== ""
                //   ? { target: "none", rel: "noopener noreferrer" }
                //   : {})}
              >
                <article
                  className={styles.card}
                  aria-label={p.name}
                  id={`team2#${p.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={p.img ?? "/placeholder-profile.png"}
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

      {/* ========================================================= */}
      {/* === 2. EXECUTIVE LEADERSHIP COMMITTEE MEMBERS — MATCH SECTION 1 ====== */}
      {/* ========================================================= */}
      <section aria-labelledby="empowering-national-pride">
        <hr className={styles.separator} />
        <h2 id="empowering-national-pride" className={styles.subHeading}>
          EXECUTIVE LEADERSHIP COMMITTEE MEMBERS
        </h2>

        <div className={styles.wrapper2}>
          <div className={styles.grid}>
            {membersList.map((p: Person, i: number) => (
              <a
                id={`team2#${p.id}`}
                key={i}
                href={resolveHref(p)}
                className={`${styles.cardLink} ${
                  resolveHref(p) === "#" ? styles.disabledLink : ""
                }`}
                // {...(p.href && p.href.trim() !== ""
                //   ? { target: "none", rel: "noopener noreferrer" }
                //   : {})}
              >
                <article
                  className={styles.card}
                  aria-label={p.name}
                  id={`team2#${p.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={p.img ?? "/placeholder-profile.png"}
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
