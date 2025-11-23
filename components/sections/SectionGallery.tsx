"use client";
import React, { useRef, useState } from "react";

export default function SectionGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const imageTrack = useRef<HTMLDivElement | null>(null);

  function onVideoPlay(id: string) {
    setActiveVideo(id);
    // pause image slider auto-play: you can store interval and clear it; here we just add a paused class
    imageTrack.current?.classList.add("paused");
  }
  function onVideoPause() {
    setActiveVideo(null);
    imageTrack.current?.classList.remove("paused");
  }

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
  const videos = ["/vid1.mp4", "/vid2.mp4"];

  return (
    <section id="gallery" aria-labelledby="galleryTitle">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <h3 id="galleryTitle">Gallery</h3>
          <div ref={imageTrack} className="image-track">
            {images.map((src, i) => (
              <div key={i} className="gallery-item">
                <img src={src} alt={`Image ${i + 1}`} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="/gallery" className="btn btn-light">
              View All Images
            </a>
          </div>
        </div>

        <div>
          <h3>Videos</h3>
          <div className="video-track">
            {videos.map((src, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <video
                  width="100%"
                  controls
                  onPlay={() => onVideoPlay(src)}
                  onPause={() => onVideoPause()}
                  onEnded={() => onVideoPause()}
                  src={src}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="/gallery" className="btn btn-light">
              View All Videos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
