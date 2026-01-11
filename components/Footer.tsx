"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPublishedBrands } from "@/lib/actions/brands";
import type { Brand } from "@/lib/brands/types";

export default function Footer() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      const result = await fetchPublishedBrands();
      if (!result.error) {
        setBrands(result.items);
      }
    };
    loadBrands();
  }, []);

  const handleImageError = (brandId: string) => {
    setBrands((prev) => prev.filter((brand) => brand.id !== brandId));
  };

  const displayedBrands = brands.slice(0, 20); // Max 5 rows × 4 logos

  return (
    <footer className="border-t bg-gray-50">
      {/* Brand Logos Section */}
      {displayedBrands.length > 0 && (
        <div className="brands-section">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">
              Our Culinary Concepts
            </h2>
            <div className="brands-grid">
              {displayedBrands.map((brand) => (
                <div key={brand.id} className="brand-item">
                  {brand.website_url ? (
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-link"
                    >
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        width={120}
                        height={80}
                        className="brand-logo"
                        loading="lazy"
                        onError={() => handleImageError(brand.id)}
                      />
                    </a>
                  ) : (
                    <Image
                      src={brand.logo_url}
                      alt={brand.name}
                      width={120}
                      height={80}
                      className="brand-logo"
                      loading="lazy"
                      onError={() => handleImageError(brand.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Separator */}
      <div className="footer-separator"></div>

      {/* Company Info Section */}
      <div className="company-section">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-left">
            © {new Date().getFullYear()} Ocean Food Group Pty Ltd. All Rights
            Reserved.
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-4 text-sm">
              <li>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
