"use client";

import { ArrowRight } from "lucide-react";
import { formatEmploymentType } from "@/lib/job-postings/employmentType";
import type { JobPosting } from "@/lib/job-postings/types";

interface JobPostingCardProps {
  job: JobPosting;
}

export function JobPostingCard({ job }: JobPostingCardProps) {
  const handleApplyClick = (e: React.MouseEvent) => {
    if (!job.external_apply_url) {
      e.preventDefault();
      return;
    }
    window.open(job.external_apply_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-start justify-between gap-(--space-xl) bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold line-clamp-1 mb-2">
          {job.title} - {job.company_name}
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          {job.suburb} {job.state} | {formatEmploymentType(job.employment_type)}
        </p>
        <p className="text-sm line-clamp-2 text-slate-700">
          {job.description}
        </p>
      </div>

      {job.external_apply_url && (
        <button
          onClick={handleApplyClick}
          className="flex flex-col items-center gap-1 shrink-0 group"
          aria-label="Apply now"
        >
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          <span className="text-xs text-slate-500 group-hover:text-primary transition-colors whitespace-nowrap">
            Apply Now
          </span>
        </button>
      )}
    </div>
  );
}
