// File: SectionSchedules.tsx
import React from "react";
import styles from "@/app/SectionSchedules.module.css";

type Block = {
  time: string;
  title: string;
  details?: string;
};

const day1: Block[] = [
  {
    time: "09:00 AM – 10:00 AM",
    title: "Delegate Reception & Traditional Welcome",
    details:
      "Guard of Honour by Sainik School Cadets | Tilak & Turban Ceremony | Live Folk Instrumental Ensemble (Rajasthani Langa Group) | Cultural Souvenir Distribution & Networking Tea",
  },
  {
    time: " ",
    title: "CEREMONIAL HIGHLIGHTS",
    details:
      "Invocation: Vande Mataram by School Choir. | Welcome Address: President, Gnarly Troop Global Federation. | Chief Guest Address: Hon'ble Prime Minister of India. | Keynote Address: Hon'ble Union Minister of Culture. | Special Address: UN Cultural Envoy / Ambassador. | Vote of Thanks: Chief Adviser, Gnarly Troop Global Federation",
  },
  {
    time: "11:45 AM – 12:45 PM",
    title: "Panel Discussion 1",
    details: "Reimagining Bharat: Ancient Traditions Through a Modern Lens",
  },
  { time: "12:45 PM – 1:30 PM", title: "Networking High Tea & Lunch Break" },
  {
    time: "1:30 PM – 2:45 PM",
    title: "Panel Discussion 2",
    details:
      "Youth Leadership & Rural Empowerment as Pillars of Cultural Enrichment",
  },
  {
    time: "3:00 PM – 5:00 PM",
    title: "National Recognition Ceremony",
    details:
      "Honouring Ambassadors, Rural Innovators & Emerging Cultural Leaders",
  },
  {
    time: "5:00 PM – 6:30 PM",
    title: "Evening Cultural Showcase",
    details:
      "Live Tribal & Folk Performances | Music | Poetry | Handicraft Exhibits",
  },
];

const day2: Block[] = [
  {
    time: "10:00 AM – 10:45 AM",
    title: "Youth Dialogue Forum",
    details: "Empowering Young Minds for Tourism & Sustainability",
  },
  {
    time: "10:45 AM – 11:45 AM",
    title: "Panel Discussion 1",
    details: "Youth Leadership in Driving Sustainability & Cultural Tourism",
  },
  {
    time: "11:45 AM – 12:30 PM",
    title: "Excellence Awards Ceremony",
    details: "Recognizing Cultural, Youth, and Sustainability Changemakers",
  },
  {
    time: "12:30 PM – 2:00 PM",
    title: "Lunch & Youth Ambassador Talks",
    details: "Presentations by Youth Ambassadors & Interactive Networking",
  },
  {
    time: "2:00 PM – 3:00 PM",
    title: "Panel Discussion 2",
    details:
      "Heritage & Business: CSR and Innovation for Cultural Preservation",
  },
];

export default function SectionSchedules() {
  return (
    <section className={styles.section} aria-labelledby="schedules-title">
      <div className={styles.container}>
        <h2 id="schedules-title" className={styles.title}>
          Padharo Mhare Desh Bharat - Schedule 2026
        </h2>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h3 className={styles.day}>DAY 1</h3>
            <p className={styles.theme}>
              THEME: Explore Bharat. Ancient Traditions in Modern Times.
            </p>
            <div className={styles.blocks}>
              {day1.map((b, i) => (
                <div key={i} className={styles.block}>
                  <time className={styles.time}>{b.time}</time>
                  <h4 className={styles.blockTitle}>{b.title}</h4>
                  {b.details && <p className={styles.details}>{b.details}</p>}
                </div>
              ))}
            </div>
          </article>

          <article className={styles.card}>
            <h3 className={styles.day}>Day 2</h3>
            <p className={styles.theme}>
              THEME: Global Leadership for Cultural Enrichment & Sustainable
              Futures
            </p>
            <div className={styles.blocks}>
              {day2.map((b, i) => (
                <div key={i} className={styles.block}>
                  <time className={styles.time}>{b.time}</time>
                  <h4 className={styles.blockTitle}>{b.title}</h4>
                  {b.details && <p className={styles.details}>{b.details}</p>}
                </div>
              ))}
            </div>
          </article>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerCard}>
            <div className={styles.leftCol}>
              <strong>Exhibition & Networking Pavilion</strong>
              <p className={styles.meta}>
                Official Hashtag:{" "}
                <span className={styles.tag}>#ExploreBharat2025</span>
              </p>
              <p className={styles.small}>
                Dress Code: Ethnic / Formal | Entry: Invitation / Registration
                Only
              </p>
            </div>

            <div className={styles.imageWrap}>
              {/* developer-provided image — using local path from the conversation history */}
              <img
                src={"/images/sections/bharat-mandapam.png"}
                alt="Bharat Mandapam Image"
                className={styles.inlineImage}
              />
            </div>

            <div className={styles.rightCol}>
              <p className={styles.highlight}>
                SPECIAL HIGHLIGHT - 3:00 PM Onwards
              </p>
              <h4 className={styles.flagOff}>
                Flag-Off Ceremony - "Explore Bharat Campaign"
              </h4>
              <p className={styles.small}>
                By: Hon'ble Vice President of India with Cultural Icons & Youth
                Leaders
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
