"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import CakeModel from "./CakeModel";
import confetti from "canvas-confetti";

export default function Cake3D({ nextSectionRef, musicRef }) {
  const [candlesOn, setCandlesOn] = useState(true);
  const [blown, setBlown] = useState(false); // new state

  const modelRef = useRef(null);
  const flameRefs = useRef([]);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const threshold = 0.04;
    const framesNeeded = 3;
    let blowFrames = 0;
    let lastTrigger = 0;

    const enableMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;

        const src = audioCtx.createMediaStreamSource(stream);
        src.connect(analyser);

        const data = new Float32Array(analyser.fftSize);

        const tick = () => {
          analyser.getFloatTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
          const rms = Math.sqrt(sum / data.length);
          const now = Date.now();

          if (rms > threshold) blowFrames++;
          else blowFrames = 0;

          if (
            blowFrames >= framesNeeded &&
            now - lastTrigger > 700 &&
            candlesOn
          ) {
            lastTrigger = now;
            console.log("Blow detected! Blowing candles...");

            // 1️⃣ Turn off candles visually
            setCandlesOn(false);
            setBlown(true); // trigger confetti

            // 2️⃣ Trigger confetti
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
            });

            // 3️⃣ Wait a few seconds before scrolling & music
            setTimeout(() => {
              // Scroll to next section
              if (nextSectionRef?.current) {
                nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
              }

              // Play music after scrolling
              if (musicRef?.current) {
                musicRef.current.play().catch((err) => {
                  console.warn("Music play blocked:", err);
                });
              }
            }, 2500); // 2.5 seconds delay
          }

          rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
      } catch (e) {
        console.warn("Microphone error:", e);
      }
    };

    enableMic();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [candlesOn, nextSectionRef, musicRef]);

  return (
    <div className="w-full h-[520px] relative">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight intensity={1.8} position={[3, 6, 3]} />

        <React.Suspense
          fallback={
            <Html center>
              <div className="text-white">در حال بارگذاری مدل...</div>
            </Html>
          }
        >
          <CakeModel
            candlesOn={candlesOn}
            modelRef={modelRef}
            flameRefs={flameRefs}
          />
        </React.Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
