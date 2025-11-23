"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timeline = [
  { year: 2022, country: "IN", city: "NEW DELHI", details: "Event hosted in New Delhi, India." },
  { year: 2023, country: "NP", city: "KATHMANDU & NEW DELHI", details: "Cross-border Nepal–India cultural exchange." },
  { year: 2024, country: "IN", city: "NOIDA & JAIPUR", details: "Multiple youth leadership programs." },
  { year: 2025, country: "IN", city: "NEW DELHI & SIKKIM", details: "Summits held in Delhi and NE India." },
  { year: 2026, country: "GB", city: "LONDON & NEW DELHI", details: "Global cultural leadership summit." },
  { year: 2027, country: "AE", city: "DUBAI & NEW DELHI", details: "Middle East partnership expansion." },
  { year: 2028, country: "US", city: "CHICAGO & NEW DELHI", details: "United States collaboration program." },
  { year: 2029, country: "IT", city: "ROME & NEW DELHI", details: "European youth exchange delegation." },
];

export default function Timeline() {
  const [selected, setSelected] = useState(null);
  const currentYear = new Date().getFullYear();

  const upcomingEvents = timeline.filter(e => e.year > currentYear);
  const recentUpcomingYear = upcomingEvents.length ? upcomingEvents[0].year : null;

  const progressPercent =
    (timeline.filter(e => e.year <= currentYear).length / timeline.length) * 100;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20 opacity-15">
        <img
          src="/images/world-map-white.png"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">Global Timeline</h2>

      <div className="relative overflow-x-auto px-6">
        {/* Progress Line */}
        <div className="absolute top-[85px] left-0 right-0 h-[3px] flex">
          <motion.div
            className="h-full bg-gray-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent - 8}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <motion.div
            className="h-full bg-orange-400 flex-1 relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              style={{ filter: "blur(4px)" }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>

        <div className="flex justify-between items-start min-w-[1000px] pt-6 pb-10 relative z-10">
          {timeline.map((item, i) => {
            const isPast = item.year < currentYear;
            const isRecentUpcoming = item.year === recentUpcomingYear;
            const isFuture = item.year > currentYear && !isRecentUpcoming;

            const stylePast = "opacity-40 text-gray-500 border-gray-400 bg-gray-200";
            const styleRecent = "border-[#FF9933] ring-4 ring-[#FF9933]/40 text-[#FF9933] animate-pulse";
            const styleFuture = "border-blue-500 ring-2 ring-blue-300 text-blue-500";

            return (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setSelected(item)}
              >
                <span
                  className={`text-lg font-semibold mb-2 ${
                    isPast
                      ? "text-gray-500"
                      : isRecentUpcoming
                      ? "text-[#FF9933]"
                      : "text-blue-600"
                  }`}
                >
                  {item.year}
                </span>

                <motion.div
                  whileHover={{ scale: isPast ? 1 : 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 rounded-full border-2 bg-white shadow flex items-center justify-center relative
                    ${
                      isPast
                        ? stylePast
                        : isRecentUpcoming
                        ? styleRecent
                        : styleFuture
                    }
                  `}
                >
                  {(isRecentUpcoming || isFuture) && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-current pointer-events-none"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <span
                      className={`fi fi-${item.country.toLowerCase()} w-full h-full rounded-full`}
                    />
                  </div>
                </motion.div>

                <div className="w-px h-6 border-l-2 border-dotted border-gray-400 mt-2 mb-2" />

                <motion.div
                  className={`-mt-1 w-3.5 h-3.5 rounded-full border-4 border-white shadow ${
                    isPast
                      ? "bg-gray-500"
                      : isRecentUpcoming
                      ? "bg-[#FF9933]"
                      : "bg-blue-500"
                  }`}
                  animate={isRecentUpcoming ? { scale: [1, 1.2, 1] } : {}}
                  transition={
                    isRecentUpcoming ? { repeat: Infinity, duration: 1.5 } : {}
                  }
                />

                <div className="text-center mt-3">
                  <div
                    className={`font-bold text-sm ${
                      isPast
                        ? "text-gray-500"
                        : isRecentUpcoming
                        ? "text-[#FF9933]"
                        : "text-blue-700"
                    }`}
                  >
                    {item.city.split(" & ")[0]}
                  </div>

                  {item.city.includes("&") && (
                    <div
                      className={`text-sm ${
                        isPast
                          ? "text-gray-400"
                          : isRecentUpcoming
                          ? "text-[#FF9933]/80"
                          : "text-blue-500"
                      }`}
                    >
                      {item.city.split(" & ")[1]}
                    </div>
                  )}

                  {!isPast && (
                    <div
                      className={`mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        isRecentUpcoming
                          ? "bg-[#FF9933]/20 text-[#FF9933]"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {isRecentUpcoming ? "Next Event" : "Upcoming"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className={`fi fi-${selected.country.toLowerCase()}`}></span>
                {selected.city}
              </h3>

              <p className="text-gray-600 mb-4">{selected.details}</p>

              <button
                onClick={() => setSelected(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
