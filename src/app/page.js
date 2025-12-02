"use client";

import { useRef, useState } from "react";
import Cake3D from "./components/Cake3D";
import SimpleCarousel from "./components/SimpleCarousel";

export default function Home() {
  const nextSectionRef = useRef(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [carouselActive, setCarouselActive] = useState(false);

  const handleUnlockAudio = () => {
    if (!audioUnlocked) {
      const music = document.getElementById("birthday-music");
      if (music) {
        music
          .play()
          .then(() => {
            music.pause();
            music.currentTime = 0;
            setAudioUnlocked(true);
          })
          .catch(() => setAudioUnlocked(true));
      }
    }
  };

  const carouselSlides = [
    { id: 1, bg: "bg-pink-900/40", content: "پیام تبریک اول" },
    { id: 2, bg: "bg-yellow-900/40", content: "گالری عکس‌ها" },
    { id: 3, bg: "bg-blue-900/40", content: "ویدیوی سورپرایز" },
  ];

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"
      onClick={handleUnlockAudio}
      onTouchStart={handleUnlockAudio}
    >
      {/* ----------------- FIRST SECTION ----------------- */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400 text-center">
        تولدت مبارک بابا 🎉
      </h1>

      <Cake3D
        nextSectionRef={nextSectionRef}
        onMusicPlay={() => setCarouselActive(true)}
      />

      <p className="mt-6 opacity-70 text-lg text-center">
        برای شروع، لطفاً با قدرت سمت کیک فوت کنید... 😜
      </p>

      {!audioUnlocked && (
        <p className="mt-2 text-red-400 text-sm animate-pulse text-center">
          برای فعال شدن صدا و میکروفون، لطفاً یکبار روی صفحه کلیک یا لمس کنید.
        </p>
      )}

      {/* ----------------- NEXT SECTION ----------------- */}
      <section
        ref={nextSectionRef}
        className="w-full min-h-screen flex items-center justify-center bg-gray-900 p-4"
      >
        <SimpleCarousel
          slides={carouselSlides}
          startAutoSlide={carouselActive}
        />
      </section>

      {/* ----------------- AUDIO ----------------- */}
      <audio
        id="birthday-music"
        ref={(el) => (window.musicRef = el)}
        src="/assets/audio/cher.mp3"
        preload="auto"
        loop
        controls={false}
      />
    </main>
  );
}
