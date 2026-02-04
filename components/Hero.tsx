"use client";

import type { HeroProps } from "@/lib/hero/types";
import Image from "next/image";
import { useState } from "react";

/**
 * Hero component with support for various background types and layouts.
 *
 * @param title - The main heading text
 * @param subtitle - Optional subtitle text
 * @param variant - Layout variant: 'center' or 'left' alignment
 * @param backgroundType - Background type: 'image', 'styled', or 'video'
 * @param backgroundImageUrl - URL for image background (desktop)
 * @param mobileBackgroundImageUrl - URL for mobile-specific image background
 * @param backgroundVideoUrl - URL for video background
 * @param backgroundVideoPosterUrl - URL for poster image displayed while video loads
 * @param backgroundVariant - Style variant for styled backgrounds: 'solid' or 'gradient'
 * @param contentImageUrl - URL for content image (left variant only)
 * @param overlay - Whether to show dark overlay on image/video backgrounds
 *
 * @example
 * // Image background
 * <Hero
 *   title="Welcome"
 *   backgroundType="image"
 *   backgroundImageUrl="/hero.jpg"
 * />
 *
 * @example
 * // Video background with poster
 * <Hero
 *   title="Welcome"
 *   backgroundType="video"
 *   backgroundVideoUrl="/hero.mp4"
 *   backgroundVideoPosterUrl="/hero-poster.jpg"
 * />
 */
export default function Hero({
  title,
  subtitle,
  variant = "center",
  backgroundType = "styled",
  backgroundImageUrl,
  mobileBackgroundImageUrl,
  backgroundVideoUrl,
  backgroundVideoPosterUrl,
  backgroundVariant = "solid",
  contentImageUrl,
  overlay = backgroundType === "image" || backgroundType === "video",
}: HeroProps) {
  const isCenterVariant = variant === "center";
  const isLeftVariant = variant === "left";
  const hasContentImage = isLeftVariant && contentImageUrl;
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      role="region"
      aria-label="Hero section"
      className={`hero relative flex ${
        isCenterVariant ? "items-center justify-center text-center" : ""
      } ${isLeftVariant && !hasContentImage ? "items-center" : ""} ${
        backgroundType === "styled"
          ? backgroundVariant === "gradient"
            ? "hero--gradient"
            : "hero--solid"
          : ""
      }`}
    >
      {/* Background Image */}
      {backgroundType === "image" &&
        (backgroundImageUrl || mobileBackgroundImageUrl) && (
          <div className="hero__background">
            {/* Desktop Background Image */}
            {backgroundImageUrl && (
              <Image
                src={backgroundImageUrl}
                alt=""
                fill
                className="object-cover"
                priority
              />
            )}
            {/* Mobile Background Image */}
            {mobileBackgroundImageUrl && (
              <Image
                src={mobileBackgroundImageUrl}
                alt=""
                fill
                className="object-cover"
                priority
              />
            )}
            {/* Fallback for single image */}
            {backgroundImageUrl && !mobileBackgroundImageUrl && (
              <Image
                src={backgroundImageUrl}
                alt=""
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        )}

      {/* Background Video Poster */}
      {backgroundType === "video" && backgroundVideoPosterUrl && (
        <div
          className={`hero__background ${videoLoaded ? "hero__background--hidden" : ""}`}
        >
          {/* Desktop Poster Image */}
          {backgroundVideoPosterUrl && (
            <Image
              src={backgroundVideoPosterUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      )}

      {/* Background Video */}
      {backgroundType === "video" && backgroundVideoUrl && !videoError && (
        <div className="hero__background">
          <video
            src={backgroundVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="object-cover w-full h-full"
            preload="metadata"
            aria-label="Background video"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => {
              setVideoError(true);
              setVideoLoaded(false);
            }}
          />
        </div>
      )}

      {/* Video Fallback - Styled Background */}
      {backgroundType === "video" && (videoError || !backgroundVideoUrl) && (
        <div className="hero--solid" />
      )}

      {/* Overlay */}
      {(backgroundType === "image" || backgroundType === "video") &&
        overlay && <div className="hero__overlay" />}

      {/* Content */}
      <div
        className={`hero__content relative z-10 ${
          isCenterVariant ? "flex flex-col items-center" : ""
        } ${
          isLeftVariant
            ? hasContentImage
              ? "flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12"
              : "flex flex-col"
            : ""
        }`}
      >
        <div
          className={`hero__text ${
            isCenterVariant ? "text-center" : "text-left"
          }`}
        >
          <h1 className="hero__title text-(length:--fs-h1) font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="hero__subtitle mt-4 text-(length:--fs-h4) text-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Image (left variant only) */}
        {hasContentImage && (
          <div className="hero__image relative w-full md:w-103.5 h-66.5 md:h-83 shrink-0">
            <Image
              src={contentImageUrl}
              alt=""
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
