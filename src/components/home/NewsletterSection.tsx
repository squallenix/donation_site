"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DoubleChevronRight } from "@/imports/icons";
import { donationService } from "@/services/donationService";
import { useDonation } from "@/hooks/useDonation";

export function NewsletterSection() {
  const { showToast } = useDonation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await donationService.subscribeNewsletter(email);
      setSubscribed(true);
      showToast(res.message);
      setEmail("");
    } catch {
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black text-white min-h-[380px] sm:min-h-[420px] flex items-center">
      {/* Background Image: Refugee Camp */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1920&q=80"
          alt="Refugee aid shelter and community camp"
          fill
          sizes="100vw"
          className="object-cover object-center sm:object-right"
        />
        {/* Warm red/burgundy gradient overlay across left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#88181d]/95 via-[#631015]/85 to-black/50 z-10" />
      </div>

      {/* Newsletter Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-xl">
          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white mb-3">
            JOIN OUR NEWSLETTER
          </h2>

          {/* Subtitle / Privacy Disclaimer */}
          <p className="text-xs sm:text-sm text-zinc-200/90 font-normal leading-relaxed mb-8 max-w-md">
            We will always treat your personal information with the utmost care and will never provide it to third parties.
          </p>

          {/* Subscription Form */}
          {subscribed ? (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full text-white text-sm">
              <span className="text-emerald-400">✓</span>
              <span>Thank you for subscribing! Check your inbox for updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white text-zinc-900 placeholder:text-zinc-400 px-5 py-3 rounded-full text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-yellow-400 shadow-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#F6C400] hover:bg-[#E5B300] active:scale-95 text-black font-bold text-sm px-7 py-3 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0 disabled:opacity-75"
              >
                <span>{loading ? "Submitting..." : "Submit"}</span>
                <DoubleChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
