import React, { JSX } from "react";
import styles from "@/app/team2/SectionTeamsIndividual.module.css";

export interface Person {
  id?: number | string | null;
  name?: string | null;
  role?: string | null;
  img?: string | null;
  bio?: string | null;
  programs?: any;
  [k: string]: any;
}

type Props = { person: Person };

// Convert programs safely to an array
const safePrograms = (programs: any) => {
  if (!Array.isArray(programs)) return [];
  return programs;
};

export default function SectionTeamsIndividual({ person }: Props): JSX.Element {
  const name = person.name ?? "Unknown";
  const role = person.role ?? "";
  const imgSrc = person.img ?? "/placeholder-profile.png";
  const bio = person.bio ?? "";
  const programsList = safePrograms(person.programs);

  return (
    <article className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a>
        <span className={styles.separator}>›</span>
        <a href={`/team2#${person.id}`}>Teams</a>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{name}</span>
      </nav>

      {/* IMAGE */}
      <div className={styles.imgWrap}>
        <img src={imgSrc} alt={name} className={styles.photo} />
      </div>

      {/* NAME */}
      <h1 className={styles.name}>{name}</h1>

      {/* ROLE */}
      <h2 className={styles.role}>{role}</h2>

      {/* PROGRAMS */}
      {/* <div className={styles.programBlock}>
        <h3 className={styles.metaTitle}>Programs</h3>
        <ul className={styles.programs}>
          {programsList.length > 0 ? (
            programsList.map((pg: any, idx: number) => (
              <li key={idx}>{pg.title ?? "Program"}</li>
            ))
          ) : (
            <li className={styles.noProgram}>—</li>
          )}
        </ul>
      </div> */}

      {/* BIO (Supports HTML + newlines) */}
      <div
        className={styles.bio}
        dangerouslySetInnerHTML={{
          __html: bio
            .trim()
            .replace(/\n\n/g, "<br/><br/>")
            .replace(/\n/g, "<br/>"),
        }}
      />
    </article>
  );
}
