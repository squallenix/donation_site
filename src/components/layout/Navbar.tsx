"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SadaqahBdLogo, DoubleChevronRight, ChevronDown } from "@/imports/icons";
import { HEADER_NAV_ITEMS, LANGUAGES, LanguageOption } from "@/constants/navigation";
import { useDonation } from "@/hooks/useDonation";

export function Navbar() {
  const { openDonationModal } = useDonation();
  const [activeLang, setActiveLang] = useState<LanguageOption>(LANGUAGES[0]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <SadaqahBdLogo className="transition-transform group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation Links (Laptop / PC) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-zinc-700">
          {HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-black py-1 relative whitespace-nowrap ${
                item.isActive
                  ? "text-black font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-expanded={langDropdownOpen}
            >
              <span className="text-base">{activeLang.flag}</span>
              <span>{activeLang.label}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-zinc-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-sm flex items-center gap-2 hover:bg-zinc-50 font-medium text-zinc-700 cursor-pointer"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Yellow Donate Pill Button */}
          <button
            onClick={() => openDonationModal({ campaignTitle: "Palestine Emergency Appeal" })}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#F6C400] hover:bg-[#E5B300] active:scale-95 text-black font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-xs transition-all duration-200 cursor-pointer shrink-0"
          >
            <span>Donate</span>
            <DoubleChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg cursor-pointer focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Mobile & Tablet) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-zinc-800 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Language</span>
            <div className="flex gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setActiveLang(l);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    activeLang.code === l.code ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
