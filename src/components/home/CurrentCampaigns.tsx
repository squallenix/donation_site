"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CAMPAIGNS, Campaign } from "@/data/campaigns";
import { DoubleChevronRight, ChevronDown } from "@/imports/icons";
import { useDonation, Currency } from "@/hooks/useDonation";

export function CurrentCampaigns() {
  const { currency, setCurrency, openDonationModal } = useDonation();
  // Keep state for each card's selected amount or custom input
  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: number | "other" }>({
    "afghanistan-earthquake": 100,
    "pakistan-floods": 100,
    "sudan-emergency": 100,
  });

  const [customAmounts, setCustomAmounts] = useState<{ [key: string]: string }>({});
  const [currencyDropdownCard, setCurrencyDropdownCard] = useState<string | null>(null);

  const handleSelectAmount = (campaignId: string, amount: number | "other") => {
    setSelectedAmounts((prev) => ({ ...prev, [campaignId]: amount }));
  };

  const handleDonateClick = (campaign: Campaign) => {
    const selected = selectedAmounts[campaign.id];
    let finalAmount = typeof selected === "number" ? selected : 100;
    if (selected === "other" && customAmounts[campaign.id]) {
      const parsed = parseFloat(customAmounts[campaign.id]);
      if (!isNaN(parsed) && parsed > 0) {
        finalAmount = parsed;
      }
    }

    openDonationModal({
      campaignTitle: campaign.title,
      initialAmount: finalAmount,
    });
  };

  return (
    <section id="campaigns" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-zinc-900 mb-8 sm:mb-12">
          CURRENT CAMPAIGNS
        </h2>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {CAMPAIGNS.map((campaign) => {
            const currentSelected = selectedAmounts[campaign.id] ?? campaign.defaultAmount;
            const isHighlighted = campaign.highlighted;

            return (
              <div
                key={campaign.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-zinc-100/80"
              >
                {/* Campaign Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                    {campaign.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-6 pb-2 px-1 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
                      {campaign.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {/* Amount selector pill group */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {/* Currency Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrencyDropdownCard(
                              currencyDropdownCard === campaign.id ? null : campaign.id
                            )
                          }
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                          aria-label="Change currency"
                        >
                          <span>{currency}</span>
                          <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                        </button>

                        {currencyDropdownCard === campaign.id && (
                          <div className="absolute left-0 mt-1.5 w-20 bg-white border border-zinc-200 rounded-xl shadow-lg py-1 z-30">
                            {(["$", "£", "€"] as Currency[]).map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => {
                                  setCurrency(c);
                                  setCurrencyDropdownCard(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-left font-semibold hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                              >
                                <span>{c}</span>
                                {currency === c && <span className="text-amber-500">✓</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Amount options */}
                      {campaign.amounts.map((amount) => {
                        const isSelected = currentSelected === amount;
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleSelectAmount(campaign.id, amount)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-black text-white shadow-xs scale-[1.03]"
                                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                            }`}
                          >
                            {currency}
                            {amount}
                          </button>
                        );
                      })}

                      {/* Other Amount Option */}
                      <button
                        type="button"
                        onClick={() => handleSelectAmount(campaign.id, "other")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          currentSelected === "other"
                            ? "bg-black text-white shadow-xs"
                            : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        }`}
                      >
                        Other
                      </button>
                    </div>

                    {/* Custom input if "Other" is selected */}
                    {currentSelected === "other" && (
                      <div className="relative mt-2">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500">
                          {currency}
                        </span>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmounts[campaign.id] || ""}
                          onChange={(e) =>
                            setCustomAmounts((prev) => ({
                              ...prev,
                              [campaign.id]: e.target.value,
                            }))
                          }
                          className="w-full pl-8 pr-4 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                          min="5"
                        />
                      </div>
                    )}

                    {/* CTA Donate Now Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleDonateClick(campaign)}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
                          isHighlighted
                            ? "bg-[#F6C400] hover:bg-[#E5B300] text-black shadow-xs"
                            : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200/80"
                        }`}
                      >
                        <span>Donate Now</span>
                        <DoubleChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
