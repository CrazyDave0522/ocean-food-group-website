"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import {
  MediaReview,
  FetchMediaReviewsResponse,
} from "@/lib/media-reviews/types";
import { MediaReviewCard } from "./MediaReviewCard";

interface MediaReviewsListProps {
  initialItems: MediaReview[];
  initialHasMore: boolean;
  onFetchMore: (
    offset: number,
    limit: number
  ) => Promise<FetchMediaReviewsResponse>;
}

export function MediaReviewsList({
  initialItems,
  initialHasMore,
  onFetchMore,
}: MediaReviewsListProps) {
  const [items, setItems] = useState<MediaReview[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(10); // Initial fetch was 10 items
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 1;
  const RETRY_DELAY = 2000; // 2 seconds

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || retryCountRef.current > MAX_RETRIES) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await onFetchMore(offset, 10);

      if (response.error) {
        throw new Error(response.error);
      }

      setItems((prev) => [...prev, ...response.items]);
      setHasMore(response.hasMore);
      setOffset((prev) => prev + 10);
      retryCountRef.current = 0; // Reset retry counter on success
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load more reviews";
      setError(errorMessage);

      // Auto-retry once after delay
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        setTimeout(() => {
          loadMore();
        }, RETRY_DELAY);
      } else {
        // Show toast notification (in a real app, use a toast library)
        console.error("Failed to load more reviews after retry:", errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset, onFetchMore]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Empty state
  if (items.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-slate-600">
          No media reviews available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {/* Media Review Cards */}
      {items.map((review, index) => (
        <div
          key={review.id}
          className="py-(--space-lg) first:pt-0 last:pb-0"
          data-index={index}
        >
          <MediaReviewCard review={review} />
        </div>
      ))}

      {/* Error message */}
      {error && (
        <div className="mt-8 text-center">
          <p className="text-error text-sm">
            Failed to load more reviews. Please try again.
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-slate-600" />
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && <div ref={sentinelRef} className="py-8" />}
    </div>
  );
}
