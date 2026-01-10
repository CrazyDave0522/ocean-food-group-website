import { fetchPublishedJobPostings } from "@/lib/actions/jobPostings";
import { JobPostingsList } from "@/components/job-postings/JobPostingsList";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Careers — Ocean Food Group",
  description: "Careers and job opportunities at Ocean Food Group.",
};

export default async function Page() {
  const result = await fetchPublishedJobPostings(0, 10);

  if (result.error) {
    return (
      <>
        <Hero
          title="Join Our Team"
          subtitle="Explore career opportunities at Ocean Food Group"
          variant="center"
          backgroundType="image"
          backgroundImageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=540&fit=crop"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-error">
              Error loading job postings. Please try again later.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero
        title="Join Our Team"
        subtitle="Explore career opportunities at Ocean Food Group"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=540&fit=crop"
      />
      <div className="container mx-auto px-4 py-12">
        <JobPostingsList
          initialItems={result.items}
          initialHasMore={result.hasMore}
          onFetchMore={fetchPublishedJobPostings}
        />
      </div>
    </>
  );
}
