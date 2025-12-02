"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "/assets/images/1.jpg",
  "/assets/images/2.jpg",
  "/assets/images/3.jpg",
  "/assets/images/4.jpg",
];

export default function SimpleCarousel({ musicRef }) {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // When music starts playing -> enable autoplay
  useEffect(() => {
    if (!musicRef?.current) return;

    const handler = () => setAutoplay(true);
    musicRef.current.addEventListener("play", handler);

    return () => {
      musicRef.current.removeEventListener("play", handler);
    };
  }, [musicRef]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => setIndex((i) => (i + 1) % IMAGES.length);
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <img src={IMAGES[index]} className="w-full rounded-xl shadow-lg" />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full"
      >
        ◀
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}
