"use client";

import Cake3D from "./components/Cake3D";
import SimpleCarousel from "./components/SimpleCarousel";
import { useRef, useState } from "react";

export default function Home() {
  const nextSectionRef = useRef(null);
  const musicRef = useRef(null);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* SECTION 1 — Only Cake */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-8">
          پدر عزیزم، تولد 55 سالگیت مبارک 🎉
        </h1>

        <Cake3D nextSectionRef={nextSectionRef} musicRef={musicRef} />

        <p className="mt-6 opacity-70 text-lg">
          برای شروع، لطفاً با قدرت سمت کیک فوت کنید... 😜
        </p>

        {/* Hidden audio, Cake3D will control it */}
        <audio
          ref={musicRef}
          id="birthday-music"
          src="/assets/audio/cher.mp3"
          preload="auto"
        />
      </section>

      {/* SECTION 2 — Carousel only */}
      <section
        ref={nextSectionRef}
        className="w-full min-h-screen bg-gray-900 flex items-center justify-center"
      >
        <SimpleCarousel musicRef={musicRef} />
      </section>
    </main>
  );
}
