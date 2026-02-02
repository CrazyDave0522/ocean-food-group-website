"use client";

import Image from "next/image";
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
    <div className="job-posting-card">
      <div className="job-posting-content">
        <div className="job-posting-info">
          <h2 className="job-posting-title">
            {job.title} - {job.company_name}
          </h2>
          <p className="job-posting-description">{job.description}</p>
          <div className="job-posting-tags">
            <span className="location-tag">
              {job.suburb} {job.state}
            </span>
            <span className="employment-type-tag">
              {formatEmploymentType(job.employment_type)}
            </span>
          </div>
        </div>

        {job.external_apply_url && (
          <button
            onClick={handleApplyClick}
            className="job-posting-apply"
            aria-label="Apply now"
          >
            <Image
              src="/images/icons/paper-plane.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>Apply Now</span>
          </button>
        )}
      </div>
    </div>
  );
}
