"use client";

import React from "react";
import { DonationProvider } from "@/contexts/DonationContext";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CurrentCampaigns } from "@/components/home/CurrentCampaigns";
import { ImpactStats } from "@/components/home/ImpactStats";
import { BoostRewards } from "@/components/home/BoostRewards";
import { LatestNews } from "@/components/home/LatestNews";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";
import { DonationModal } from "@/components/home/DonationModal";

export function HomePage() {
  return (
    <DonationProvider>
      <div className="flex flex-col min-h-screen bg-white text-zinc-900 selection:bg-[#F6C400] selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* Palestine Emergency Appeal Hero */}
          <HeroSection />

          {/* Current Campaigns (Afghanistan, Pakistan Floods, Sudan) */}
          <CurrentCampaigns />

          {/* Impact Story Quote & 50,000+ Stats */}
          <ImpactStats />

          {/* Boost Your Rewards (Zakat, Sadaqah, Orphans) */}
          <BoostRewards />

          {/* Latest News and Updates */}
          <LatestNews />

          {/* Join Our Newsletter */}
          <NewsletterSection />
        </main>

        {/* Rich Footer with Watermark */}
        <Footer />

        {/* Global Interactive Donation Modal */}
        <DonationModal />
      </div>
    </DonationProvider>
  );
}
