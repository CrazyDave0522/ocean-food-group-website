"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#14224A] text-white">
      {/* Top Section */}
      <div className="py-8 flex items-center justify-center gap-6 md:gap-8 px-4 md:px-8">
        {/* Logo */}
        <div className="shrink-0 w-20 md:w-30">
          <Image
            src="/images/logos/Ocean-Food-white.png"
            alt="Ocean Food Group"
            width={120}
            height={42}
            className="footer-logo w-full h-auto"
            style={{ height: "auto" }}
          />
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 text-xs md:text-sm">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Separator Line */}
      <div className="flex justify-center px-4">
        <div className="w-4/5 border-t border-white/20"></div>
      </div>

      {/* Bottom Section */}
      <div className="py-6 flex justify-center">
        <div className="text-xs md:text-sm text-center">
          © {new Date().getFullYear()} Ocean Food Group Pty Ltd. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
