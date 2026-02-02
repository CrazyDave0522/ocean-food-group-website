"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/media-reviews", label: "Media Reviews" },
    { href: "/franchise", label: "Franchise" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Body scroll lock when mobile menu is open (robust, iOS-friendly)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) {
        const y = -parseInt(top || "0", 10);
        window.scrollTo(0, y);
      }
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) {
        const y = -parseInt(top || "0", 10);
        window.scrollTo(0, y);
      }
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60" style={{ borderBottom: '1px solid #C4C9D6' }}>
        <div className="px-[clamp(16px,4vw,32px)] md:px-(--space-3xl) py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/Ocean-Food-bg-cropped.png"
              alt="Ocean Food Group"
              width={120}
              height={42}
              className="header-logo"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex gap-[clamp(24px,4vw,80px)] header-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden"
          >
            <Image
              src="/images/icons/nav-mb.svg"
              alt=""
              width={50}
              height={50}
              className="hamburger-icon"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden mobile-menu-overlay">
          <nav
            role="navigation"
            aria-label="Mobile navigation"
            className="mobile-menu-nav"
          >
            <ul className="flex flex-col header-nav-mobile">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={isActive(link.href) ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
