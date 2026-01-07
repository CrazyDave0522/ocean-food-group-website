import { fetchPublishedMediaReviews } from "@/lib/actions/mediaReviews";
import { MediaReviewsList } from "@/components/media-reviews/MediaReviewsList";

export const metadata = {
  title: "Media Reviews — Ocean Food Group",
  description: "Media reviews and press about Ocean Food Group.",
};

export default async function Page() {
  const { items, hasMore, error } = await fetchPublishedMediaReviews(0, 10);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Media Reviews</h1>

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
  );
}
