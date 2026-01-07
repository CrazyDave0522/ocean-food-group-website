"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { MediaReview } from "@/lib/media-reviews/types";
import { formatAustralianDate } from "@/lib/utils/formatDate";

interface MediaReviewCardProps {
  review: MediaReview;
}

export function MediaReviewCard({ review }: MediaReviewCardProps) {
  // Extract alt text from title or filename
  const getAltText = () => {
    if (review.title) return review.title;
    if (review.cover_image_url) {
      return (
        review.cover_image_url.split("/").pop()?.split(".")[0] ||
        "Media review image"
      );
    }
    return "Media review image";
  };

  const detailUrl = `/media-reviews/${review.slug}`;

  return (
    <a
      href={detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-0 bg-white">
        {/* Image Container */}
        <div className="w-full md:w-62.5 md:shrink-0 aspect-video relative bg-slate-100 md:self-start">
          {review.cover_image_url ? (
            <Image
              src={review.cover_image_url}
              alt={getAltText()}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 250px"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200">
              <ImageOff className="w-12 h-12 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 space-y-(--space-sm) md:space-y-(--space-md) px-(--space-md) md:px-(--space-xl)">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold line-clamp-2">
            {review.title}
          </h3>

          {/* Excerpt */}
          {review.excerpt && (
            <p className="text-sm md:text-base text-slate-600 line-clamp-2">
              {review.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="text-xs md:text-sm text-slate-500 flex items-center gap-4">
            <span>{review.author || "Unknown Author"}</span>
            <span>·</span>
            <span>{formatAustralianDate(review.publish_date)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
