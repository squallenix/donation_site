import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLUMNS } from "@/constants/navigation";
import {
  FacebookIcon,
  XTwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/imports/icons";

export function Footer() {
  return (
    <footer className="relative bg-[#0E1012] text-zinc-400 overflow-hidden pt-16 pb-12 border-t border-zinc-800/80">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & Social Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-zinc-800">
          {/* Brand Logo in White */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white shrink-0"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
              <path
                d="M10 17C10 13.6863 12.6863 11 16 11C19.3137 11 22 13.6863 22 17C22 19.5 20.2 21.6 18 22.2V19.5C18.8 19.1 19.5 18.1 19.5 17C19.5 15.067 17.933 13.5 16 13.5C14.067 13.5 12.5 15.067 12.5 17C12.5 18.1 13.2 19.1 14 19.5V22.2C11.8 21.6 10 19.5 10 17Z"
                fill="currentColor"
              />
              <circle cx="16" cy="17" r="1.5" fill="#10B981" />
            </svg>
            <span className="font-heading text-xl sm:text-2xl font-black tracking-wider text-white">
              SADAQAH BD
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <XTwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 5 Footer Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.flag && (
                        <div className="relative w-4 h-3 shrink-0 rounded-xs overflow-hidden">
                          <Image
                            src={link.flag}
                            alt={link.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright notice */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} SADAQAH BD Relief. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="#security" className="hover:text-zinc-300 transition-colors">
              Security & Compliance
            </Link>
          </div>
        </div>
      </div>

      {/* Massive subtle watermark "SADAQAH BD" across bottom */}
      <div className="w-full overflow-hidden text-center leading-none mt-6 select-none pointer-events-none opacity-[0.05] px-4">
        <span className="font-heading text-[11vw] sm:text-[13vw] font-black uppercase tracking-tight text-white block truncate leading-none">
          SADAQAH BD
        </span>
      </div>
    </footer>
  );
}
