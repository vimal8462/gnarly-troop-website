"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Users, Handshake, Globe, Leaf } from "lucide-react";

export default function GnarlyTroopVision() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [circleCoords, setCircleCoords] = useState<{ x: number; y: number }[]>(
    []
  );
  const pipeRefs = useRef<SVGPathElement[]>([]);
  const imageLoadCount = useRef(0);

  const visionData = useMemo(
    () => [
      {
        id: "climate",
        title: "CLIMATE",
        icon: Leaf,
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
        description:
          "Advocating green living, clean air, and ecosystem conservation through eco-tourism and tree plantation.",
      },
      {
        id: "community",
        title: "COMMUNITY",
        icon: Users,
        image:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
        description:
          "Promoting rural empowerment, health, education, and youth development.",
      },
      {
        id: "culture",
        title: "CULTURE",
        icon: Globe,
        image:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        description:
          "Reviving Indian traditions through arts, crafts, cuisines, festivals, and interfaith dialogue.",
      },
      {
        id: "cooperation",
        title: "COOPERATION",
        icon: Handshake,
        image:
          "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
        description:
          "Strengthening global harmony through multi-cultural exchanges and international partnerships.",
      },
    ],
    []
  );

  const handleCircleClick = (id: string) =>
    setActiveSection((prev) => (prev === id ? null : id));

  // Calculate center coords of circles (scoped to this component)
  const calculateCircleCoords = () => {
    const svgEl = svgRef.current;
    const containerEl = containerRef.current;
    if (!svgEl || !containerEl) return;

    // find circle button elements inside this component container
    const circles = Array.from(
      containerEl.querySelectorAll<HTMLElement>(".circle-btn")
    );
    if (circles.length === 0) {
      setCircleCoords([]);
      return;
    }

    const parentRect = svgEl.getBoundingClientRect();
    const coords = circles.map((c) => {
      const rect = c.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top,
      };
    });

    setCircleCoords(coords);
  };

  // measure after layout and when container size changes
  useLayoutEffect(() => {
    calculateCircleCoords();

    // ResizeObserver to track container size changes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      ro = new ResizeObserver(() => {
        calculateCircleCoords();
      });
      ro.observe(containerRef.current);
    }

    // cleanup
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
      ro = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate when images inside cards load (they can change layout)
  useEffect(() => {
    // if multiple images load, only recalc after they have all fired
    const onImgLoad = () => {
      imageLoadCount.current += 1;
      // call calc on each image load — cheap and robust
      calculateCircleCoords();
    };

    const container = containerRef.current;
    if (!container) return;
    const imgs = Array.from(
      container.querySelectorAll<HTMLImageElement>("img")
    );
    imgs.forEach((img) => {
      img.addEventListener("load", onImgLoad);
    });

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visionData]);

  // Animate flowing liquid — uses pipeRefs, which we reset each render where circleCoords change
  useEffect(() => {
    // clear stale refs to avoid weird indices
    pipeRefs.current = [];
    let animationFrame = 0;

    const animate = () => {
      pipeRefs.current.forEach((path) => {
        if (path) {
          try {
            const length = path.getTotalLength();
            // stroke dash pattern & offset to create "flow"
            path.style.strokeDasharray = `${length / 2} ${length / 2}`;
            const offset = parseFloat(path.dataset.offset || "0") - 3;
            path.dataset.offset = String(offset);
            path.style.strokeDashoffset = String(offset);
          } catch (e) {
            // ignore if path is not ready yet
          }
        }
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [circleCoords]);

  // Helper to compute a smooth cubic bezier between two points
  const makeCurve = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    idx: number
  ) => {
    // fallback if coords not ready
    if (!a || !b) return "";
    // determine curve direction/height based on viewport width (client-only)
    const isNarrow =
      typeof window !== "undefined" ? window.innerWidth < 1024 : false;
    const curveHeight = isNarrow ? 80 : 120;
    const controlYOffset = curveHeight * (idx % 2 === 0 ? -1 : 1);
    const cx1 = (a.x + b.x) / 2;
    const cy1 = a.y + controlYOffset;
    const cx2 = (a.x + b.x) / 2;
    const cy2 = b.y - controlYOffset;
    return `M${a.x},${a.y} C${cx1},${cy1} ${cx2},${cy2} ${b.x},${b.y}`;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 border-t-2 border-b-2 border-gray-300 py-4 px-8 inline-block">
            4C's Vision of Gnarly Troop
          </h1>
        </div>

        {/* Circles + Pipes */}
        <div className="relative flex flex-col lg:flex-row justify-center items-center mb-16">
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          >
            <defs>
              <linearGradient
                id="pipe3DGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c7d2fe" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>

              <linearGradient id="liquidFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* draw pipes only when there are coords */}
            {circleCoords.length >= 2 &&
              circleCoords.map((coord, i) => {
                if (i === circleCoords.length - 1) return null;
                const next = circleCoords[i + 1];
                const pathD = makeCurve(coord, next, i);
                return (
                  <g key={`pipe-${i}`}>
                    <path
                      d={pathD}
                      stroke="url(#pipe3DGradient)"
                      strokeWidth={16}
                      fill="transparent"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={(el) => {
                        if (el) pipeRefs.current[i] = el;
                      }}
                      d={pathD}
                      stroke="url(#liquidFlow)"
                      strokeWidth={10}
                      fill="transparent"
                      strokeLinecap="round"
                      data-offset="0"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}
          </svg>

          {/* Circles */}
          {visionData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative z-10 flex justify-center my-4 lg:my-0 lg:flex-1"
              >
                <button
                  onClick={() => handleCircleClick(item.id)}
                  className="circle-btn relative transition-all duration-500 ease-out"
                  aria-pressed={activeSection === item.id}
                >
                  <div
                    className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 ${
                      activeSection === item.id
                        ? "border-blue-400 shadow-2xl"
                        : "border-dashed border-gray-300 shadow-lg"
                    } flex items-center justify-center bg-white transition-all duration-500 cursor-pointer ${
                      activeSection === item.id ? "animate-pulse-slow" : ""
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-500 ${
                          activeSection === item.id
                            ? "bg-blue-500 scale-110"
                            : "bg-blue-400"
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3
                        className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                          activeSection === item.id
                            ? "text-blue-400"
                            : "text-gray-800"
                        }`}
                      >
                        {item.title.charAt(0) +
                          item.title.slice(1).toLowerCase()}
                      </h3>
                    </div>
                  </div>

                  {activeSection === item.id && (
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionData.map((item) => (
            <div
              key={item.title}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
                activeSection === item.id
                  ? "scale-105 shadow-2xl ring-4 ring-blue-400"
                  : activeSection === null
                  ? "hover:scale-105"
                  : "opacity-60 scale-95"
              }`}
            >
              <div
                className={`text-white text-center py-3 font-bold text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === item.id ? "bg-blue-500" : "bg-blue-400"
                }`}
              >
                {item.title}
              </div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  onLoad={() => calculateCircleCoords()}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    activeSection === item.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-sm text-blue-500 leading-relaxed text-center font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
