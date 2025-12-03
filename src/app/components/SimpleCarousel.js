"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/3.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/1.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/2.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/4.jpg",
  "https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/5.jpg",
  "/assets/images/dad1.jpg",
  "/assets/images/dad2.jpg",
];

export default function SimpleCarousel({ nextSectionRef }) {
  const [index, setIndex] = useState(0);

  // Autoplay interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (index < IMAGES.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        // Scroll to next section when last image is reached
        if (nextSectionRef?.current) {
          nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        clearInterval(interval);
      }
    }, 7000); // 7 seconds per slide

    return () => clearInterval(interval);
  }, [index, nextSectionRef]);

  const next = () => {
    if (index < IMAGES.length - 1) setIndex((i) => i + 1);
  };
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative w-full md:max-w-3xl mx-auto overflow-hidden rounded-xl">
      {/* Carousel images */}
      <div className="relative w-full h-[420px] md:h-[520px]">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-1800 ease-out ${
              i === index
                ? "opacity-100 scale-105 translate-x-0"
                : "opacity-0 scale-100 translate-x-3"
            }`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 cursor-pointer -translate-y-1/2 bg-black/40 p-3 rounded-full text-white text-xl z-10"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 bg-black/40 p-3 rounded-full text-white text-xl z-10"
      >
        ▶
      </button>
    </div>
  );
}
