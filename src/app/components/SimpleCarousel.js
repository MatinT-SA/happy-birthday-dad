"use client";

import { useState, useEffect, useRef } from "react";

const IMAGES = [
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105423.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105651.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_112129.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105606.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_112009.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_103922.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104626.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105001.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_104857.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_103847.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/20251203_105057.jpg",
  "/assets/images/dad1.jpg",
  "/assets/images/dad2.jpg",
];

export default function SimpleCarousel({ nextSectionRef, canPlay }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!canPlay) return;
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev < IMAGES.length - 1) return prev + 1;

        // last slide → scroll to video section
        if (nextSectionRef?.current)
          nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        clearInterval(intervalRef.current);
        return prev;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current);
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
