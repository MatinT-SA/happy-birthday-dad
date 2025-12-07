"use client";

import { useState, useEffect, useRef } from "react";

const IMAGES = [
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
  "https://cdn.pixabay.com/photo/2019/04/18/13/26/a-random-lake-4136935_1280.jpg",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-photo/tree-with-orange-leaves-zugspitze-lake-eibsee_181624-13795.jpg?semt=ais_hybrid&w=740&q=80",
];

export default function SimpleCarousel({ nextSectionRef, canPlay }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // Preload first image
  useEffect(() => {
    const img = new Image();
    img.src = IMAGES[0];
  }, []);

  // Automatic carousel rotation
  useEffect(() => {
    if (!canPlay) return;
    const delay = 2500;
    const timer = setTimeout(() => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          if (prev < IMAGES.length - 1) return prev + 1;
          if (nextSectionRef?.current)
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
          clearInterval(intervalRef.current);
          return prev;
        });
      }, 7000);
    }, delay);

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

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute cursor-pointer left-0 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 sm:p-3 rounded-full text-white text-xs sm:text-xl z-10"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute cursor-pointer right-0 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 sm:p-3 rounded-full text-white text-xs sm:text-xl z-10"
      >
        ▶
      </button>
    </div>
  );
}
