"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const banners = [
    {
      id: 1,
      image: "/banner 1.png",
      title: "Discover Your Style",
      subtitle: "Fresh fashion. Better value. All in one place.",
      button: "Shop Now",
      link: "/shop",
    },
    {
      id: 2,
      image: "/banner 2.png",
      title: "New Arrivals",
      subtitle: "Explore the latest styles made for you.",
      button: "Explore Now",
      link: "/new-arrivals",
    },
    {
      id: 3,
      image: "/banner 3.png",
      title: "Amazing Deals",
      subtitle: "Great products at prices you'll love.",
      button: "View Deals",
      link: "/deals",
    },
    {
      id: 4,
      image: "/banner 4.png",
      title: "Trending Now",
      subtitle: "Shop the styles everyone is talking about.",
      button: "Shop Trending",
      link: "/trending",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Previous
  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // Next
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="w-full bg-[#F7F8FA]">

      <div className="relative w-full overflow-hidden shadow-sm">

        {/* SLIDES */}
        <div className="relative aspect-[16/5.5] min-h-[160px] w-full overflow-hidden sm:min-h-[220px] lg:min-h-[300px]">

          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="relative h-full w-full min-w-full shrink-0"
              >

                {/* IMAGE */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/25" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-center">

                  <div className="max-w-xl px-6 sm:px-10 lg:px-14">

                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD23F] sm:text-sm">
                      Velora • Value • Aura
                    </p>

                    <h1 className="text-2xl font-black leading-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                      {banner.title}
                    </h1>

                    <p className="mt-2 max-w-md text-xs leading-5 text-white/90 sm:mt-3 sm:text-sm lg:text-base">
                      {banner.subtitle}
                    </p>

                    <a
                      href={banner.link}
                      className="mt-4 inline-flex items-center rounded-lg bg-[#FF6A00] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#E85B00] hover:scale-105 sm:mt-5 sm:px-6 sm:py-3 sm:text-sm"
                    >
                      {banner.button}

                      <svg
                        className="ml-2"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </a>

                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={previousSlide}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 sm:left-5 sm:h-11 sm:w-11"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 sm:right-5 sm:h-11 sm:w-11"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-7 bg-[#FF6A00]"
                    : "w-1.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}