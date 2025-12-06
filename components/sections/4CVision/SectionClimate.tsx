"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import styles from "@/app/4cvision/climate/SectionClimate.module.css";

// const SectionClimate: React.FC = () => {
export default function SectionClimate() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className={styles.sectionClimate}>
      {/* Title and Video section */}
      <div className={styles.topTealBand}>
        <div className={styles.inner}>
          <h1 className={styles.pageTitle}>ECONOMIC OPPORTUNITY</h1>

          <p className={styles.lead}>
            In many low and middle income countries, the path to economic
            opportunity runs through agriculture. Smallholder farmers provide
            livelihoods for 2.5 billion people worldwide and grow 80% of the
            food for regions such as South Asia and sub-Saharan Africa.
          </p>
          <p className={styles.lead}>
            We support partners who develop solutions that result in more crops,
            income, food, credit, and economic opportunities for small farmers
            and the people they hire while helping families weather the many
            impacts of climate change.
          </p>
          <br />
          <br />
          {/* Hero “video in device” frame */}
          {/* <div className={styles.heroFrame}>
            <div className={styles.heroScreen}>
              <img
                src="/images/hero.mp4"
                alt="Person smiling while speaking about digital payment systems"
                className={styles.heroImage}
              />
              <button className={styles.playButton} aria-label="Play video">
                <span className={styles.playIcon} />
              </button>
            </div>
          </div> */}

          {/* Hero “video in device” frame */}
          {/* ------------------------------- */}
          <div className={styles.heroFrame}>
            <div className={styles.heroScreen}>
              <video
                ref={videoRef}
                className={styles.heroVideo}
                src="/hero.mp4"
                // poster="/images/logos/logo-1.png"
                playsInline
                controls // 👈 this shows play, pause, fullscreen, etc.
              />

              {!isPlaying && (
                <button
                  className={styles.playButton}
                  aria-label="Play video"
                  onClick={handlePlay}
                >
                  <span className={styles.playIcon} />
                </button>
              )}
            </div>
          </div>
          {/* ------------------------------- */}
        </div>
      </div>

      {/* Featured article strip */}
      <section className={styles.featuredStrip}>
        <div className={styles.inner}>
          <div className={styles.featuredCard}>
            <div className={styles.featuredText}>
              <p className={styles.featuredKicker}>FEATURED ARTICLE</p>
              <h2 className={styles.featuredTitle}>
                THE DIGITAL FINANCE FIX HELPING NIGERIA&apos;S MARKET VENDORS
                GROW THEIR BUSINESSES
              </h2>
              <p className={styles.featuredBody}>
                See how a partnership between Lagos State, a bank, and local
                innovators is using digital tools to empower small businesses in
                markets across Nigeria.
              </p>
              <button className={styles.yellowButton}>Read the story</button>
            </div>
            <div className={styles.featuredImageWrap}>
              <img
                src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20251104-lagos-business-school/no750742_1600x1000.jpg?rev=dc2e03b573fa45bcbb2b021837b3b3fb&w=1200&hash=38E5EC70BBEBE48520E3033850F4E188"
                alt="Market vendors laughing together"
                className={styles.featuredImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main article grid */}
      <section className={styles.articleSection}>
        <div className={styles.inner}>
          {/* Two larger top cards */}
          <div className={styles.topArticleGrid}>
            <article className={styles.largeArticle}>
              <div className={styles.largeImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20250627-gargee-ghosh-development-finance-challenges/hero_ideas_gargee-ffd_rl734612_1600x1000.jpg?rev=a9f31588cc0b4a06866b5d0e13e87947&w=800&hash=93523069D19B6AF66A5E8D5435C1612D"
                  alt="Woman with children"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.largeContent}>
                <p className={styles.cardKicker}>DEVELOPMENT FINANCE</p>
                <h3 className={styles.cardTitle}>
                  NEEDS A RESET, NOT A RETREAT
                </h3>
                <p className={styles.cardBody}>
                  George Okoth talks about how development finance can unlock
                  climate-smart solutions and support opportunity.
                </p>
              </div>
            </article>

            <article className={styles.largeArticle}>
              <div className={styles.largeImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/progress/garden-future/hero_garden-of-the-future_0n2a4442-jpg-325323.jpg?rev=e11cd1b3bf484272a3619281801b91d2&w=800&hash=080BC70CE3305E020D5BDA3D5B3A91AB"
                  alt="Green community garden"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.largeContent}>
                <p className={styles.cardKicker}>THE GARDEN OF THE FUTURE</p>
                <h3 className={styles.cardTitle}>
                  HOW SMALL CHANGES CREATE BIG IMPACTS
                </h3>
                <p className={styles.cardBody}>
                  Discover how climate-smart farming and access to new markets
                  are changing the lives of smallholder farmers.
                </p>
              </div>
            </article>
          </div>

          {/* 3 x 2 smaller cards */}
          <div className={styles.smallGrid}>
            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20250512-empowering-resilient-food-production/search_ideas_phoebe_bo730988_1600x1000.jpg?rev=27accecbbb67495483e1a927b8950706&w=800&hash=B81DCAE647E97BDA13296DDDDD3CF2EE"
                  alt="Kenyan farmer"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  Meet the Kenyan farmer helping her community grow food in a
                  changing climate
                </h4>
                <p className={styles.smallBody}>
                  New irrigation techniques and access to credit are helping
                  families grow more with less water.
                </p>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20250507-bean-variety-innovator/hero-clare-mukankusi.jpg?rev=9eb9639e772c44e99447d8e847dfe74c&w=800&hash=3AFD90B3924806857407C3B07AA21199"
                  alt="Scientist in field"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  Meet the innovator: This scientist is building the beans of
                  the future
                </h4>
                <p className={styles.smallBody}>
                  Climate-resilient crops are protecting harvests and incomes
                  for farmers across Africa.
                </p>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20250212-kibera-womens-health-advocate/ga17586575_bo690271_1600x1000.jpg?rev=43bcf8d86b2d40b29427621b82856386&w=800&hash=8A18978EA7C5341505B3BF05704B3480"
                  alt="Doctor smiling"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  A doctor at the intersection of women&apos;s health and
                  economic power
                </h4>
                <p className={styles.smallBody}>
                  Accessible care and financial tools are unlocking opportunity
                  for women entrepreneurs.
                </p>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20241121-women-global-care-economy/hero_ideas_care_ga17586693_bo690449_1600x1000.jpg?rev=335fd123401f4a71961be3e4aa255f15&w=800&hash=5F86D6832851D3358179651826C1E85A"
                  alt="Woman preparing food"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  Q&amp;A: How strengthening the care economy can boost
                  women&apos;s workforce participation
                </h4>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20230816-what-is-digital-public-infrastructure/hero_ideas_dpi-explainer_ga17089024_mm646912_08162023_1600x1000.jpg?rev=1b44f5f8432e45e59d81a5e53905b7d9&w=800&hash=AD8D232D8A759BE93907DD9D89C01622"
                  alt="Woman speaking at event"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  Why digital public infrastructure matters
                </h4>
                <p className={styles.smallBody}>
                  Secure digital systems can help deliver climate assistance and
                  social protection faster.
                </p>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.smallImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/articles/20240725-womens-economic-power-credit/hero_ideas_greater-capital_ga17612212_em693859_07242024_1600x1000.jpg?rev=089054479acc4e21bab6663a4f9aebc5&w=800&hash=B2CAB74016CC326B003E59FE9BF789A7"
                  alt="Entrepreneur in workshop"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.smallContent}>
                <h4 className={styles.smallTitle}>
                  Designing credit that works for women
                </h4>
                <p className={styles.smallBody}>
                  Flexible products help women invest in businesses and adapt to
                  climate shocks.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter & giving strip */}
      {/* <section className={styles.bottomStrip}>
        <div className={styles.inner}>
          <div className={styles.bottomGrid}>
            <div className={styles.givingBlock}>
              <div className={styles.givingText}>
                <p className={styles.givingKicker}>
                  INTERESTED IN GIVING TO GRANTEES WE SUPPORT?
                </p>
                <button className={styles.yellowButton}>
                  Learn more at Gates Philanthropy Partners
                </button>
              </div>
              <div className={styles.givingImageWrap}>
                <img
                  src="https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/progress/ga17166080_ae652095.jpg?rev=c017067a0ba64e408b1cd17528c1feff&w=1600&hash=76B6C21F4A71D2018AED07F64C5C43C4"
                  alt="Two women talking on a bench"
                  className={styles.givingImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </section>
  );
}

// export default SectionClimate;
