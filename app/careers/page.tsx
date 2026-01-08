import { fetchPublishedJobPostings } from "@/lib/actions/jobPostings";
import { JobPostingsList } from "@/components/job-postings/JobPostingsList";

export const metadata = {
  title: "Careers — Ocean Food Group",
  description: "Careers and job opportunities at Ocean Food Group.",
};

export default async function Page() {
  const result = await fetchPublishedJobPostings(0, 10);

  if (result.error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Careers</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            Error loading job postings. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Careers</h1>
      <JobPostingsList
        initialItems={result.items}
        initialHasMore={result.hasMore}
        onFetchMore={fetchPublishedJobPostings}
      />
    </div>
  );
}
