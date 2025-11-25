"use client";

import React, { useState } from "react";
import defaultStyles from "@/app/schedule2.module.css";
import schedule1 from "@/app/SectionSchedules.module.css";

export default function Schedule() {
  const [day, setDay] = useState<1 | 2>(1);

  return (
    <section className={defaultStyles.container}>
      {/* PAGE TITLE */}
      <h2 id="schedules-title" className={schedule1.title}>
        Padharo Mhare Desh Bharat - Schedule 2026
      </h2>
      {/* HEADER */}
      <header className={defaultStyles.header}>
        <div className={defaultStyles.headerInner}>
          <div className={defaultStyles.titleWrap}>
            <h1 className={defaultStyles.title}>
              EXPLORE BHARAT WITH GNARLYTROOP
            </h1>

            <div className={defaultStyles.subtitle}>
              <strong>
                <span style={{ color: "var(--accent-2)" }}>Theme: </span>
                <span style={{ color: "var(--accent)" }}>
                  Explore Bharat — Ancient Traditions in Modern Times
                </span>
              </strong>
              {/* DAY SWITCHER */}
              <div className={defaultStyles.daySwitcher}>
                <button
                  onClick={() => setDay(1)}
                  className={`${defaultStyles.switchBtn} ${
                    day === 1 ? defaultStyles.active : ""
                  }`}
                >
                  Day-1
                  {/* <span>21ᵗʰ FEBRUARY 2026 (SATURDAY)</span> */}
                </button>

                <button
                  onClick={() => setDay(2)}
                  className={`${defaultStyles.switchBtn} ${
                    day === 2 ? defaultStyles.active : ""
                  }`}
                >
                  Day-2
                  {/* <span>22ⁿᵈ FEBRUARY 2026 (SUNDAY)</span> */}
                </button>
              </div>
              <span className={defaultStyles.date}>
                Day-1 - 21ᵗʰ FEBRUARY 2026 (SATURDAY)
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------ DAY 1 CONTENT ------------------ */}
      {day === 1 && (
        <>
          {/* ------------------ FULL DAY 1 SCHEDULE ------------------ */}
          <div className={defaultStyles.timelineWrap}>
            {/* LEFT COLUMN */}
            <div className={defaultStyles.colLeft}>
              {/* 09:00 AM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.blue}`}
              >
                <time className={defaultStyles.time}>09:00 AM — 10:00 AM</time>
                <h3 className={defaultStyles.cardTitle}>
                  Delegate Registration & Traditional Welcome
                </h3>

                <ul className={defaultStyles.cardBody}>
                  <li>
                    Guard of Honour by Sainik School Cadets | Tilak & Turban
                    Ceremony.
                  </li>
                  <li>
                    Live Folk Instrumental Ensemble • Cultural Souvenir
                    Distribution & Networking Tea.
                  </li>
                </ul>

                <h3 className={defaultStyles.cardTitle}>
                  CEREMONIAL HIGHLIGHTS
                </h3>

                <ul className={defaultStyles.cardBody}>
                  <li>
                    <b>Invocation:</b> Vande Mataram by School Choir
                  </li>
                  <li>
                    <b>Welcome Address:</b> President, Gnarly Troop Global
                    Federation
                  </li>
                  <li>
                    <b>Guest Address:</b> Hon'ble Prime Minister of India
                  </li>
                  <li>
                    <b>Keynote Address:</b> Hon'ble Union Minister of Culture
                  </li>
                  <li>
                    <b>Special Address:</b> UN Cultural Envoy / Ambassador
                  </li>
                  <li>
                    <b>Vote of Thanks:</b> Chief Adviser, Gnarly Troop Global
                    Federation
                  </li>
                </ul>
              </article>

              {/* 10:00 AM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.orange}`}
              >
                <time className={defaultStyles.time}>10:00 AM — 10:45 AM</time>
                <h3 className={defaultStyles.cardTitle}>
                  Inaugural Ceremony & Lamp Lighting
                </h3>

                <p className={defaultStyles.cardBody}>
                  <span style={{ color: "var(--accent)" }}>
                    Invited Dignitaries:
                  </span>{" "}
                  <b>
                    Hon'ble Prime Minister of India (Chief Guest) | Union
                    Minister of Culture | Parliamentarians | Ambassadors |
                    Cultural Leaders
                  </b>
                </p>
              </article>

              {/* 10:45 AM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.cyan}`}
              >
                <time className={defaultStyles.time}>10:45 AM — 11:45 AM</time>
                <h3 className={defaultStyles.cardTitle}>Parliamentary Talk</h3>

                <ul className={defaultStyles.cardBody}>
                  <li>
                    <b>Theme:</b> Policy and Parliament: Preserving Heritage
                  </li>
                  <li>
                    <b>Focus:</b> Strengthening heritage tourism & youth
                    participation
                  </li>
                  <li>
                    <b>Panelists:</b> MPs | Think Tank Experts | Advisors
                  </li>
                </ul>
              </article>

              {/* 11:45 AM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.cyan}`}
              >
                <time className={defaultStyles.time}>11:45 AM — 12:45 AM</time>
                <h3 className={defaultStyles.cardTitle}>LEADERS TALK</h3>

                <ul className={defaultStyles.cardBody}>
                  <li>
                    <b>Topic:</b> Reimagining Bharat – Ancient Traditions
                    Through a Modern Lens
                  </li>
                  <li>
                    <b>Focus:</b> Cultural wisdom with innovation
                  </li>
                  <li>
                    <b>Speakers:</b> Cultural Entrepreneurs | Tourism Heads |
                    Thought Leaders
                  </li>
                </ul>
              </article>
            </div>

            {/* TIMELINE CENTER */}
            <div className={defaultStyles.timelineCenter}>
              <div className={defaultStyles.centerLine} />
              <div className={defaultStyles.centerDots}>
                <span className={defaultStyles.dot} style={{ top: "18%" }} />
                <span className={defaultStyles.dot} style={{ top: "32%" }} />
                <span className={defaultStyles.dot} style={{ top: "46%" }} />
                <span className={defaultStyles.dot} style={{ top: "66%" }} />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className={defaultStyles.colRight}>
              {/* 12:45 PM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.green}`}
              >
                <time className={defaultStyles.time}>12:45 PM — 1:30 PM</time>
                <h3 className={defaultStyles.cardTitle}>
                  Networking High Tea & Lunch Break
                </h3>
                <p className={defaultStyles.cardBody}>
                  • Live Folk Music <br />• Exhibition Visit <br />• Media
                  Interaction
                </p>
              </article>

              {/* 1:30 PM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.lightBlue}`}
              >
                <time className={defaultStyles.time}>1:30 PM — 2:45 PM</time>
                <h3 className={defaultStyles.cardTitle}>Ambassadors Talk</h3>

                <ul className={defaultStyles.cardBody}>
                  <li>
                    <b>Topic:</b> Youth Leadership & Rural Empowerment
                  </li>
                  <li>
                    <b>Focus:</b> Global exchanges & diplomacy
                  </li>
                  <li>
                    <b>Speakers:</b> Youth Ambassadors | NGO Leaders
                  </li>
                </ul>

                <h3 className={defaultStyles.cardTitle}>HONOURING</h3>
                <ul className={defaultStyles.cardBody}>
                  <li>Distinguished Ambassadors</li>
                  <li>Rural Innovators</li>
                  <li>Youth & Women Leaders</li>
                  <li>
                    <b>Chief Guest:</b> Minister of External Affairs
                  </li>
                  <li>
                    <b>Presentation:</b> Mementoes & Certificates
                  </li>
                </ul>
              </article>

              {/* 3PM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.purple}`}
              >
                <time className={defaultStyles.time}>3:00 PM — 4:30 PM</time>
                <h3 className={defaultStyles.cardTitle}>Ministers Talk</h3>
                <p className={defaultStyles.cardBody}>
                  National Recognition & Leadership Awards Ceremony
                </p>
              </article>

              {/* 4:30 PM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.green}`}
              >
                <time className={defaultStyles.time}>4:30 PM — 6:30 PM</time>
                <h3 className={defaultStyles.cardTitle}>Rangilo Bharat</h3>
                <p className={defaultStyles.cardBody}>
                  • Tribal & Folk Performances <br />
                  • Poetry Recitals <br />
                  • Spiritual Harmony Talk <br />• Artisan Handicraft Exhibition
                </p>
              </article>

              {/* 6:30 PM */}
              <article
                className={`${defaultStyles.card} ${defaultStyles.dark}`}
              >
                <time className={defaultStyles.time}>6:30 PM — 7:30 PM</time>
                <h3 className={defaultStyles.cardTitle}>
                  Gala Networking Dinner
                </h3>
                <p className={defaultStyles.cardBody}>
                  <b>Guests:</b> Diplomats | Delegates | Media | Artists
                </p>
              </article>
            </div>
          </div>

          {/* FOOTER */}
          <footer className={schedule1.footer}>
            <div className={schedule1.footerCard}>
              <div className={schedule1.leftCol}>
                <strong>Exhibition & Networking Pavilion</strong>
                <p className={schedule1.meta}>
                  Official Hashtag:
                  <span className={schedule1.tag}> #ExploreBharat2026</span>
                </p>
                <p className={schedule1.small}>
                  Dress Code: Ethnic / Formal | Entry: Registration Only
                </p>
              </div>

              <div className={schedule1.imageWrap}>
                <img
                  src={"/images/sections/bharat-mandapam.png"}
                  className={schedule1.inlineImage}
                  alt="Mandapam"
                />
              </div>

              <div className={schedule1.rightCol}>
                <p className={schedule1.highlight}>SPECIAL HIGHLIGHT</p>
                <h4 className={schedule1.flagOff}>
                  Flag-Off Ceremony - Explore Bharat Campaign
                </h4>
                <p className={schedule1.small}>
                  By Hon'ble Vice President of India & Youth Leaders
                </p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* ------------------ DAY 2 CONTENT ------------------ */}
      {day === 2 && (
        <div className={defaultStyles.day2Wrap}>
          <div className={defaultStyles.hr} />

          {/* ⭐ Add your full Day-2 content here */}
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>
            Day-2 content coming soon…
          </h3>
        </div>
      )}
    </section>
  );
}
