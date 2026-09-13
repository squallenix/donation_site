import React from "react";
import Image from "next/image";
import { IMPACT_STATS, IMPACT_QUOTE } from "@/data/stats";

export function ImpactStats() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story / Quote Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-14 pb-14 sm:pb-16">
          {/* Volunteer Photo */}
          <div className="relative w-full md:w-80 lg:w-96 aspect-[4/3] shrink-0 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={IMPACT_QUOTE.image}
              alt={IMPACT_QUOTE.alt}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>

          {/* Testimonial / Impact Statement */}
          <div className="flex-1">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-zinc-900 leading-snug tracking-tight">
              &ldquo;{IMPACT_QUOTE.text}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* 3 Metric Stats Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-8 sm:pt-12 border-t border-zinc-100">
          {IMPACT_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-tight">
                {stat.value}
              </span>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                <strong className="text-zinc-900 font-semibold">{stat.label}</strong> – {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
