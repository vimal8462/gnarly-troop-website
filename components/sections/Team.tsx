// app/team/page.jsx
// import Image from "next/image";
// import Link from "next/link";
import styles from "@/app/team/Team.module.css";

import leaders from "@/app/team/leaders-data";
import members from "@/app/team/members-data";

export default function TeamPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.topNav}>
          <a href="/" className={styles.backBtn}>
            ← Back
          </a>
          <h1 className={styles.title}>Welcome to The Gnarly Troop World</h1>
          <div></div>
        </div>

        {/* Video + Heirarchy */}
        <section className={styles.heroSection}>
          <div className={styles.videoBox}>
            <iframe
              src="/videos/hirarchy.mp4"
              className={styles.video}
              allowFullScreen
            ></iframe>
          </div>

          <aside className={styles.sidebarBox}>
            <h2>Heirarchy</h2>
            <p>
              “We cannot close ourselves off to information and ignore the fact
              that millions of people are out there suffering. I honestly want
              to help. I don’t believe I feel differently from other people. I
              think we all want justice and equality, a chance for a life with
              meaning. All of us would like to believe that if we were in a bad
              situation someone would help us.”
            </p>
          </aside>
        </section>
        <section>
          <blockquote className={styles.quote}>
            <h2>
              <b>Gnarly Founder:</b> One of the best indicators of success is
              the capacity to react swiftly and forcefully to setbacks in life.
              Not your athletic prowess, beauty, or the fact that you took first
              place in a pie-eating contest in year nine... It's an area I find
              absolutely fascinating because it predicts your overall gnarly
              success and happiness throughout your lifespan. Your capacity to
              adapt in troop and respond to the changing seasons of life. I've
              come to this conclusion about what it takes to develop resilience
              as a result of everything I've gone through, everyone I've talked
              to, and everything I've learned. We appreciate your participation
              in Gnarly Troop today.
            </h2>
          </blockquote>
        </section>

        {/* Global Leaders */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gnarly Global Leadership</h2>

          <div className={styles.grid}>
            {leaders.map((p) => (
              <article key={p.id} className={styles.card}>
                <h4>{p.role}</h4>
                <div className={styles.imgWrap}>
                  <img src={p.img} alt={p.name} className={styles.img} />
                </div>
                <div className={styles.cardBody}>
                  <p>{p.name}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Members large grid */}
        <section className={styles.largeSection}>
          <h3 className={styles.sectionTitle}>
            Empowering National Pride with the Gnarly Troop
          </h3>

          <div className={styles.badgeGrid}>
            {members.map((m) => (
              <div key={m.id} className={styles.badgeCard}>
                <div className={styles.badgeCircle}>
                  <img src={m.img} alt={m.name} className={styles.badgeImg} />
                </div>
                <div className={styles.badgeBody}>
                  <p className={styles.badgeName}>{m.name}</p>
                  <p className={styles.badgeRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cards */}
        {/* <section className={styles.bottomCards}>
          {[
            { title: "Gnarly Team", img: "/images/card1.jpg" },
            { title: "Troop Team", img: "/images/card2.jpg" },
            { title: "Member States", img: "/images/card3.jpg" },
          ].map((c, i) => (
            <div key={i} className={styles.ctaCard}>
              <img src={c.img} alt={c.title} className={styles.ctaImg} />
              <div className={styles.ctaOverlay}>
                <h4>{c.title}</h4>
                <button className={styles.ctaButton}>VIEW ALL</button>
              </div>
            </div>
          ))}
        </section> */}
      </div>
    </main>
  );
}
