import { fetchPublishedMediaReviews } from "@/lib/actions/mediaReviews";
import { MediaReviewsList } from "@/components/media-reviews/MediaReviewsList";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Media Reviews — Ocean Food Group",
  description: "Media reviews and press about Ocean Food Group.",
};

export default async function Page() {
  const { items, hasMore, error } = await fetchPublishedMediaReviews(0, 10);

  return (
    <>
      <Hero
        title="Media Reviews"
        subtitle="Press coverage and reviews about Ocean Food Group"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=540&fit=crop"
      />

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">
              Error loading media reviews. Please try again later.
            </p>
          </div>
        )}

        <MediaReviewsList
          initialItems={items}
          initialHasMore={hasMore}
          onFetchMore={fetchPublishedMediaReviews}
        />
      </div>
    </>
  );
}
