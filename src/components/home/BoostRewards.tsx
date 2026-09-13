"use client";

import React from "react";
import { BOOST_REWARDS } from "@/data/rewards";
import { ZakatIcon, SadaqahIcon, OrphansIcon, DoubleChevronRight } from "@/imports/icons";
import { useDonation } from "@/hooks/useDonation";

export function BoostRewards() {
  const { openDonationModal } = useDonation();

  const renderIcon = (type: string) => {
    switch (type) {
      case "zakat":
        return <ZakatIcon className="w-5 h-5 text-zinc-300" />;
      case "sadaqah":
        return <SadaqahIcon className="w-5 h-5 text-zinc-300" />;
      case "orphans":
        return <OrphansIcon className="w-5 h-5 text-zinc-300" />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#0E1012] py-20 sm:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white">
            BOOST YOUR REWARDS
          </h2>
        </div>

        {/* 3 Dark Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {BOOST_REWARDS.map((reward) => (
            <div
              key={reward.id}
              className="group flex flex-col items-center text-center bg-[#15181C] hover:bg-[#1A1E24] border border-zinc-800/90 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-6 border border-zinc-700/50 group-hover:scale-105 transition-transform">
                {renderIcon(reward.type)}
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wider text-white mb-3">
                {reward.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-8 flex-1">
                {reward.description}
              </p>

              {/* Action Button */}
              <button
                type="button"
                onClick={() =>
                  openDonationModal({
                    campaignTitle: `${reward.title} Fund`,
                    initialAmount: reward.suggestedAmount,
                  })
                }
                className="w-full py-2.5 px-5 bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/60 rounded-full text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>{reward.buttonText.replace(" »", "")}</span>
                <DoubleChevronRight className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
