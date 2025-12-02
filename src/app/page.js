"use client";

import Cake3D from "./components/Cake3D";
import { useRef, useState } from "react";

export default function Home() {
  const nextSectionRef = useRef(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const handleUnlockAudio = () => {
    if (!audioUnlocked) {
      const music = document.getElementById("birthday-music");
      if (music) {
        music.play().catch(() => {}); // start and immediately pause
        music.pause();
        music.currentTime = 0;
        setAudioUnlocked(true);
      }
    }
  };

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"
      onClick={handleUnlockAudio} // desktop
      onTouchStart={handleUnlockAudio} // mobile
    >
      <h1 className="text-4xl font-bold mb-8">تولدت مبارک بابا 🎉</h1>

      <Cake3D nextSectionRef={nextSectionRef} />

      <p className="mt-6 opacity-70 text-lg">
        برای شروع، لطفاً با قدرت سمت کیک فوت کنید... 😜
      </p>

      {/* Placeholder for next section */}
      <div
        ref={nextSectionRef}
        className="w-full h-screen flex items-center justify-center bg-gray-900 mt-12"
      >
        <p className="text-white text-2xl">
          🎵 Music will play here and we will scroll automatically!
        </p>
      </div>

      {/* Audio element */}
      <audio
        ref={(el) => (window.musicRef = el)}
        id="birthday-music"
        src="/assets/audio/cher.mp3"
        preload="auto"
        controls={false}
      />
    </main>
  );
}
