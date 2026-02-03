"use client";

import type { HeroProps } from "@/lib/hero/types";
import Image from "next/image";
import { useState } from "react";

export default function Hero({
  title,
  subtitle,
  variant = "center",
  backgroundType = "styled",
  backgroundImageUrl,
  mobileBackgroundImageUrl,
  backgroundVideoUrl,
  backgroundVariant = "solid",
  contentImageUrl,
  overlay = (backgroundType === "image" || backgroundType === "video"),
}: HeroProps) {
  const isCenterVariant = variant === "center";
  const isLeftVariant = variant === "left";
  const hasContentImage = isLeftVariant && contentImageUrl;
  const [videoError, setVideoError] = useState(false);

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
            onError={() => setVideoError(true)}
          />
        </div>
      )}

      {/* Video Fallback - Styled Background */}
      {backgroundType === "video" && (videoError || !backgroundVideoUrl) && (
        <div className="hero--solid" />
      )}

      {/* Overlay */}
      {(backgroundType === "image" || backgroundType === "video") && overlay && (
        <div className="hero__overlay" />
      )}

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
