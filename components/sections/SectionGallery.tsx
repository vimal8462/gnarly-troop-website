"use client";
import React, { useRef, useEffect } from "react";
import styles from "@/app/gallery.module.css";

/**
 * Props:
 *  - images: array of image URLs (strings)
 *  - videos: array of video URLs (strings)
 *  - baseSpeed: pixels per second used to compute animation duration (higher = faster)
 */
export default function MediaGallery({
  images = [],
  videos = [],
  baseSpeed = 28,
}) {
  const imgTrack = useRef(null);
  const vidTrack = useRef(null);

  // compute and set --marquee-duration on each track based on its scrollWidth
  useEffect(() => {
    function setDuration(trackRef) {
      const el = trackRef.current;
      if (!el) return;
      // track content is duplicated to allow seamless loop; use half width as single pass width
      const totalWidth = el.scrollWidth / 2 || el.scrollWidth;
      // duration in seconds = width px / speed px-per-sec
      const duration = Math.max(6, Math.round(totalWidth / baseSpeed));
      el.style.setProperty("--marquee-duration", `${duration}s`);
    }

    setDuration(imgTrack);
    setDuration(vidTrack);

    // Recalculate on resize
    const ro = new ResizeObserver(() => {
      setDuration(imgTrack);
      setDuration(vidTrack);
    });
    if (imgTrack.current) ro.observe(imgTrack.current);
    if (vidTrack.current) ro.observe(vidTrack.current);
    return () => ro.disconnect();
  }, [images, videos, baseSpeed]);

  // duplicate items (arr concatenated to itself) for seamless scroll
  const dup = (arr) => (arr && arr.length ? arr.concat(arr) : []);

  // helper to play/pause video on hover/focus
  const handleVideoHover = (e, type) => {
    const v = e.currentTarget.querySelector("video");
    if (!v) return;
    if (type === "enter") {
      v.muted = true;
      v.play().catch(() => {}); // ignore play exceptions
    } else {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <section className={styles.wrapper} aria-label="Media gallery">
      <div className={styles.column}>
        <h3 className={styles.title}>Gallery</h3>
        <div className={styles.viewport} aria-hidden={images.length === 0}>
          <div
            className={styles.track}
            ref={imgTrack}
            // pause animation while pointer is inside (CSS also handles this)
            onMouseEnter={(e) => e.currentTarget.classList.add(styles.paused)}
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove(styles.paused)
            }
          >
            {dup(images).map((src, i) => (
              <figure
                className={styles.card}
                key={`img-${i}`}
                tabIndex={0}
                aria-label={`Image ${(i % (images.length || 1)) + 1}`}
              >
                <img
                  className={styles.media}
                  src={src}
                  alt={`Gallery image ${(i % (images.length || 1)) + 1}`}
                  loading="lazy"
                />
                <figcaption className={styles.caption}>
                  Image {(i % (images.length || 1)) + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.column}>
        <h3 className={styles.title}>Videos</h3>
        <div className={styles.viewport} aria-hidden={videos.length === 0}>
          <div
            className={`${styles.track} ${styles.trackReverse}`}
            ref={vidTrack}
            onMouseEnter={(e) => e.currentTarget.classList.add(styles.paused)}
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove(styles.paused)
            }
          >
            {dup(videos).map((src, i) => (
              <figure
                className={styles.card}
                key={`vid-${i}`}
                tabIndex={0}
                onMouseEnter={(e) => handleVideoHover(e, "enter")}
                onMouseLeave={(e) => handleVideoHover(e, "leave")}
                onFocus={(e) => handleVideoHover(e, "enter")}
                onBlur={(e) => handleVideoHover(e, "leave")}
                aria-label={`Video ${(i % (videos.length || 1)) + 1}`}
              >
                <video
                  className={styles.media}
                  src={src}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  // don't autoplay globally; play on hover via handlers
                />
                <div className={styles.playIcon} aria-hidden>
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M5 3v18l15-9L5 3z" />
                  </svg>
                </div>
                <figcaption className={styles.caption}>
                  Video {(i % (videos.length || 1)) + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
