export type JobPostingStatus = "draft" | "published" | "closed";

export type EmploymentType = "full_time" | "part_time" | "casual" | "contract" | "intern";

export interface JobPosting {
  id: string;
  title: string;
  company_name: string;
  suburb: string;
  state: string;
  employment_type: EmploymentType;
  description: string;
  status: JobPostingStatus;
  created_at: string;
  published_at: string | null;
  closed_at: string | null;
  external_apply_url: string | null;
}

export interface FetchJobPostingsResult {
  items: JobPosting[];
  hasMore: boolean;
  error?: string;
}
