"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SimpleCarousel({ slides, startAutoSlide }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide change after music starts
  useEffect(() => {
    if (!startAutoSlide) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [startAutoSlide, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full max-w-lg mx-auto p-4 md:p-8 bg-gray-800/80 rounded-2xl shadow-2xl overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-full h-64 flex items-center justify-center rounded-xl ${slide.bg}`}
          >
            <span className="text-white text-xl">{slide.content}</span>
          </div>
        ))}
      </div>

      {/* Arrows are positioned relative to this carousel only */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black/90 transition z-10"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black/90 transition z-10"
          >
            <ChevronRight className="w-6 h-6 text-yellow-400" />
          </button>
        </>
      )}
    </div>
  );
}
