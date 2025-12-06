import React, { JSX } from "react";
import styles from "@/app/leadership/SectionTeamsIndividual.module.css";

export interface Person {
  id: string; // <-- always string
  name?: string | null;
  role?: string | null;
  img?: string | null;
  bio?: string | null;
  programs?: any;
  [k: string]: any;
}

type Props = { person: Person };

const safePrograms = (programs: any) => {
  return Array.isArray(programs) ? programs : [];
};

export default function SectionTeamsIndividual({ person }: Props): JSX.Element {
  return (
    <article className={styles.container}>
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a>
        <span className={styles.separator}>›</span>
        <a href={`/leadership#${person.id}`}>Teams</a>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{person.name}</span>
      </nav>

      <div className={styles.imgWrap}>
        <img
          src={person.img || "/placeholder-profile.png"}
          alt={person.name || ""}
          className={styles.photo}
        />
      </div>

      <h1 className={styles.name}>{person.name}</h1>
      <h2 className={styles.role}>{person.role}</h2>

      <div
        className={styles.bio}
        dangerouslySetInnerHTML={{
          __html: (person.bio || "")
            .trim()
            .replace(/\n\n/g, "<br/><br/>")
            .replace(/\n/g, "<br/>"),
        }}
      />
    </article>
  );
}
