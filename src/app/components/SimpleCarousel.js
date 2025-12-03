"use client";

import { useState, useEffect, useRef } from "react";

const IMAGES = [
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105423.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105651.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_112129.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105606.jpg",
  "/assets/images/dad2.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_112009.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_103922.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_110257.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105001.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104857.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104833.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105057.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_103847.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/3.jpg?updatedAt=1764707460533",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104109.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_110956.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105153.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_110002.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104137.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/1.jpg?updatedAt=1764707575883",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/2.jpg?updatedAt=1764707606439",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105920.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104239.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104223.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104321.jpg",
  "/assets/images/dad1.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/5.jpg?updatedAt=1764707545139",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/4.jpg?updatedAt=1764707492482",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_111117.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_110935.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_111732.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_110154.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_111716.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_135217_348.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_135251_976.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_135827_255.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_135500_195.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20240608_125620.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_134916_238.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/IMG_20251203_134801_091.jpg",
];

export default function SimpleCarousel({ nextSectionRef, canPlay }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!canPlay) return;
    if (intervalRef.current) return;

    // Delay first image to match Cake3D confetti + scroll delay
    const initialDelay = 2500; // match the setTimeout in Cake3D
    let firstTickDone = false;

    const startSlideshow = () => {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          if (prev < IMAGES.length - 1) return prev + 1;

          // last slide → scroll to next section
          if (nextSectionRef?.current)
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });

          clearInterval(intervalRef.current);
          return prev;
        });
      }, 5200);
    };

    const timer = setTimeout(() => {
      firstTickDone = true;
      startSlideshow();
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [canPlay, nextSectionRef]);

  const next = () =>
    setIndex((prev) => (prev + 1 < IMAGES.length ? prev + 1 : prev));
  const prev = () =>
    setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative w-full md:max-w-3xl mx-auto overflow-hidden rounded-xl">
      <div className="relative w-full h-[420px] md:h-[520px]">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-1800 ease-out ${
              i === index
                ? "opacity-100 scale-105 translate-x-0"
                : "opacity-0 scale-100 translate-x-3"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white text-xl z-10"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white text-xl z-10"
      >
        ▶
      </button>
    </div>
  );
}
