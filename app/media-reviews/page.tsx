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
        backgroundImageUrl="/images/backgrounds/hero-food.png"
        overlay={false}
      />

      <div className="container-main py-12">
        {error && (
          <div className="bg-error/10 border border-error/20 rounded-md p-4 mb-6">
            <p className="text-error">
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
