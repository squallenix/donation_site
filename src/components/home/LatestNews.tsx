import React from "react";
import Image from "next/image";
import { LATEST_NEWS } from "@/data/news";

export function LatestNews() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-zinc-900 mb-8 sm:mb-12">
          LATEST NEWS AND UPDATES
        </h2>

        {/* 3 News Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {LATEST_NEWS.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Yellow Accent Bar */}
              <div className="w-8 h-1 bg-[#F6C400] rounded-full mb-3" />

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors leading-snug tracking-tight mb-2">
                {article.title}
              </h3>

              {/* Snippet */}
              <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed line-clamp-3">
                {article.snippet}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
