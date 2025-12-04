"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface CollaborationPageProps {
  images?: {
    village?: string;
    women?: string;
    community?: string;
    university?: string;
    saras?: string;
    portal?: string;
  };
}

export default function CollaborationPage({ images = {} }: CollaborationPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const featureList = [
    {
      id: 1,
      title: "Rural Village & Development by Troops",
      desc: "Troop-led missions: sanitation, education, health camps, youth skilling and agricultural support.",
      img: images.village || "/images/collaboration/village-dev.jpg",
    },
    {
      id: 2,
      title: "Activities to Promote Rural Women",
      desc: "Training, microfinance linkages, SHG strengthening, and sustainable livelihood programs.",
      img: images.women || "/images/collaboration/women.jpg",
    },
    {
      id: 3,
      title: "Community Outreach & Cultural Exchange",
      desc: "Festivals, cultural camps, and art residencies promoting Punjab’s rich heritage.",
      img: images.community || "/images/collaboration/community.jpg",
    },
    {
      id: 4,
      title: "Universities & Global Summits",
      desc: "Academic collaborations, product research clinics and global market exposure.",
      img: images.university || "/images/collaboration/university.jpg",
    },
    {
      id: 5,
      title: "Saras Mela with Gnarly Troop",
      desc: "A curated SHG marketplace featuring crafts, food and organic goods.",
      img: images.saras || "/images/collaboration/saras-mela.jpg",
    },
    {
      id: 6,
      title: "Portal Launch: Brand & Marketplace",
      desc: "A digital platform for branding, cataloging and selling handmade rural products.",
      img: images.portal || "/images/collaboration/portal.jpg",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Handwoven Phulkari Dupatta",
      desc: "Traditional embroidered dupatta crafted by rural artisans",
      img: "/images/products/phulkari.jpg",
    },
    {
      id: 2,
      name: "Organic Honey",
      desc: "Pure honey harvested from village apiaries",
      img: "/images/products/honey.jpg",
    },
    {
      id: 3,
      name: "Terracotta Pottery",
      desc: "Hand-molded clay pots and home decor",
      img: "/images/products/pottery.jpg",
    },
    {
      id: 4,
      name: "Pickles & Preserves",
      desc: "Traditional homemade pickles and chutneys",
      img: "/images/products/pickles.jpg",
    },
    {
      id: 5,
      name: "Bamboo Handicrafts",
      desc: "Eco-friendly baskets and decor",
      img: "/images/products/bamboo.jpg",
    },
    {
      id: 6,
      name: "Organic Spices",
      desc: "Farm-fresh ground spices and masalas",
      img: "/images/products/spices.jpg",
    },
  ];

  function openModal(src: string) {
    setModalSrc(src);
    setModalOpen(true);
    setTimeout(() => modalRef.current?.focus(), 100);
  }

  function closeModal() {
    setModalOpen(false);
    setModalSrc("");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ---------------- HERO SECTION WITH FIXED VIDEO ---------------- */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          src="/videos/hirarchy.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl text-center max-w-3xl"
          >
            Empowering rural communities through troop-led development, women empowerment,
            village marketplace initiatives & global collaborations.
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Six Pillars */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Six Pillars of Collaboration</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our holistic approach to sustainable rural development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((f, idx) => (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(f.img)}
              >
                <img src={f.img} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Products */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Authentic handcrafted products from Punjab’s rural artisans
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(p.img)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              >
                <img src={p.img} className="h-64 w-full object-cover group-hover:scale-110 transition" />
                <div className="p-6">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-600 text-sm">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Photo Gallery</h2>
            <p className="text-gray-600 text-lg">Click to enlarge</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featureList.map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(f.img)}
                className="block w-full h-32 overflow-hidden rounded-xl shadow"
              >
                <img src={f.img} className="object-cover w-full h-full" />
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>

      {/* ---------------- MODAL ---------------- */}
     {modalOpen && (
  <div
    className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
    onClick={closeModal}
  >
    <motion.div
      className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      tabIndex={-1}
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-amber-700 p-2 rounded-full shadow hover:bg-gray-100"
      >
        close
      </button>

      <img
        src={modalSrc}
        className="w-full max-h-[80vh] object-contain"
      />
    </motion.div>
  </div>
)}

    </div>
  );
}
