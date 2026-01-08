"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Briefcase } from "lucide-react";
import { JobPostingCard } from "./JobPostingCard";
import type { JobPosting, FetchJobPostingsResult } from "@/lib/job-postings/types";

interface JobPostingsListProps {
  initialItems: JobPosting[];
  initialHasMore: boolean;
  onFetchMore: (offset: number, limit: number) => Promise<FetchJobPostingsResult>;
}

export function JobPostingsList({
  initialItems,
  initialHasMore,
  onFetchMore,
}: JobPostingsListProps) {
  const [items, setItems] = useState<JobPosting[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(initialItems.length);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setError(null);

          try {
            const result = await onFetchMore(offsetRef.current, 10);

            if (result.error) {
              setError(result.error);
              setIsLoading(false);
              return;
            }

            setItems((prev) => [...prev, ...result.items]);
            offsetRef.current += result.items.length;
            setHasMore(result.hasMore);
            setError(null);
          } catch (err) {
            setError("Failed to load more job postings. Please try again.");
            console.error("Error loading more postings:", err);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onFetchMore]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-lg text-slate-600">
          No job postings available at this time. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-slate-200">
        {items.map((job, index) => (
          <div
            key={job.id}
            className={`py-(--space-lg) ${index === 0 ? "first:pt-0" : ""} ${
              index === items.length - 1 ? "last:pb-0" : ""
            }`}
          >
            <JobPostingCard job={job} />
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className="py-8 text-center text-slate-500">
          Scroll for more...
        </div>
      )}
    </div>
  );
}
