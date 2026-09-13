"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { DoubleChevronRight } from "@/imports/icons";
import { useDonation } from "@/hooks/useDonation";

interface Slide {
  id: string;
  tagline: string;
  titleLines: string[];
  description: string;
  buttonText: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: "palestine",
    tagline: "EMERGENCY APPEAL",
    titleLines: ["PALESTINE", "EMERGENCY", "APPEAL"],
    description:
      "Families in Palestine need urgent help. Your support can provide food, shelter, and medical aid with SADAQAH BD.",
    buttonText: "Donate Now. Save Lives.",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: "gaza-food",
    tagline: "WINTER CRISIS",
    titleLines: ["GAZA FOOD &", "SHELTER RELIEF", "CAMPAIGN"],
    description:
      "Over 1.9 million displaced civilians lack essential warmth, clean drinking water, and daily nutrition.",
    buttonText: "Send Food & Warmth.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: "medical-aid",
    tagline: "HOSPITALS COLLAPSING",
    titleLines: ["CRITICAL MEDICAL", "SUPPLIES FOR", "FIELD HOSPITALS"],
    description:
      "Deliver surgical kits, sterile trauma bandages, anesthetics, and emergency care directly to doctors.",
    buttonText: "Provide Medical Kits.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: "water-crisis",
    tagline: "CLEAN WATER APPEAL",
    titleLines: ["CLEAN WATER FOR", "DISPLACED", "FAMILIES"],
    description:
      "Desalination tankers and water purification tablets deployed to protect children from waterborne illness.",
    buttonText: "Supply Clean Water.",
    image:
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1920&q=85",
  },
];

const SLIDE_DURATION_MS = 6000;

export function HeroSection() {
  const { openDonationModal } = useDonation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Timer for smooth green progress bar and slide rotation
  useEffect(() => {
    const updateInterval = 50; // Update progress every 50ms
    const step = (updateInterval / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          nextSlide();
          return 0;
        }
        return old + step;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation for PC / Laptop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped left -> next
      nextSlide();
    } else if (diff < -50) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <section
      aria-label="Humanitarian Emergency Appeals Slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[520px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[720px] bg-black text-white overflow-hidden select-none"
    >
      {/* Background Hero Images with Smooth Transition */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={slide.image}
            alt={slide.titleLines.join(" ")}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center sm:object-right"
          />
        </div>
      ))}

      {/* Cinematic Gradient Overlays (Crimson on left, vignette all around) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#800b14]/92 via-[#45090f]/80 to-transparent w-full sm:w-[70%] lg:w-[60%] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[520px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between py-10 sm:py-14 lg:py-16">
        {/* Top Tagline with Emerald Green Indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 lg:mb-4 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {currentSlide.tagline}
          </span>
        </div>

        {/* Hero Copy & CTA */}
        <div className="max-w-2xl my-auto py-6 sm:py-0">
          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-wide leading-[0.88] text-white drop-shadow-md">
            {currentSlide.titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle description */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-zinc-100/90 font-normal max-w-lg leading-relaxed drop-shadow-sm">
            {currentSlide.description}
          </p>

          {/* Yellow CTA button */}
          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                openDonationModal({
                  campaignTitle: currentSlide.titleLines.join(" "),
                  initialAmount: 100,
                })
              }
              className="inline-flex items-center gap-2.5 bg-[#F6C400] hover:bg-[#E5B300] active:scale-95 text-black font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <span>{currentSlide.buttonText}</span>
              <DoubleChevronRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Green Slider Controls & Progress Indicator */}
        <div className="pt-6 sm:pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-2xl">
            {/* 4-Segment Green Progress Bar */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5 flex-1">
              {SLIDES.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                const isCompleted = index < currentSlideIndex;

                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlideIndex(index);
                      setProgress(0);
                    }}
                    className="group py-2.5 sm:py-3 cursor-pointer focus:outline-hidden text-left"
                    aria-label={`Go to slide ${index + 1}: ${slide.titleLines.join(" ")}`}
                  >
                    {/* Outer track */}
                    <div className="relative h-1.5 sm:h-2 rounded-full overflow-hidden bg-emerald-950/80 border border-emerald-900/60 group-hover:border-emerald-600 transition-colors">
                      {/* Active green filling indicator */}
                      {isActive && (
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      {/* Already completed slides stay solid green */}
                      {isCompleted && (
                        <div className="h-full w-full bg-emerald-500/80 rounded-full" />
                      )}
                      {/* Inactive slides hint on hover */}
                      {!isActive && !isCompleted && (
                        <div className="h-full w-0 group-hover:w-full bg-emerald-600/30 transition-all duration-200" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next / Prev Navigation Buttons with Green Accents (Laptop / PC / Mobile) */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                ◀
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
