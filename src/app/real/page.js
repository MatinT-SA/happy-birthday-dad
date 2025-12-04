"use client";

import React, { useRef, useState } from "react";
import Cake3D from "../components/Cake3D";
import SimpleCarousel from "../components/SimpleCarousel";

export default function Home() {
  const nextSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const musicRef = useRef(null);

  // Track whether the candles have been blown
  const [candlesBlown, setCandlesBlown] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-iransans">
      {/* SECTION 1 — Cake */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-lg md:text-5xl font-bold mb-8 text-center">
          پدر عزیزم، تولد 55 سالگیت مبارک 🎉
        </h1>

        <Cake3D
          nextSectionRef={nextSectionRef}
          musicRef={musicRef}
          setCandlesBlown={setCandlesBlown}
        />

        <p className="mt-6 opacity-70 text-lg text-center">
          با قدرت کیک رو فوت کن 😜
        </p>

        <audio ref={musicRef} src="/assets/audio/cher.mp3" preload="auto" />
      </section>

      {/* SECTION 2 — Carousel */}
      <section
        ref={nextSectionRef}
        className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-6"
      >
        <SimpleCarousel
          nextSectionRef={videoSectionRef}
          canPlay={candlesBlown} // autoplay starts only after candles blown
        />
      </section>

      {/* SECTION 3 — Video */}
      <section
        ref={videoSectionRef}
        className="w-full min-h-screen bg-gray-800 flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          سخنی جاودانه از بهترین بابای دنیا
        </h2>

        <video
          src="https://ik.imagekit.io/7qvdh2mdgk/happy%20birthday%20dad/dad.mp4"
          preload="auto"
          className="w-full max-w-3xl rounded-xl shadow-lg cursor-pointer"
          controls
        >
          Your browser does not support the video tag.
        </video>

        <p className="mt-4 text-center text-lg opacity-80">
          برای پخش، روی ویدیو کلیک کنید
        </p>
      </section>
    </main>
  );
}
