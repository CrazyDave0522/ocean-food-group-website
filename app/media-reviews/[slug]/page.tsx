import { cache } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchMediaReviewDetail } from "@/lib/actions/mediaReviewsDetail";
import { renderEditorJs } from "@/lib/media-reviews/renderEditorJs";
import { formatAustralianDate } from "@/lib/utils/formatDate";

export const revalidate = 0;

const getReview = cache(async (slug: string) => {
  const { review, error } = await fetchMediaReviewDetail(slug);

  if (error) {
    throw new Error(error);
  }

  if (!review) {
    notFound();
  }

  return review;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const review = await getReview(slug);
    return {
      title: `Media Review — ${review.title}`,
      description: review.excerpt || review.title,
    };
  } catch {
    return {
      title: "Media Review",
      description: "Media review detail",
    };
  }
}

export default async function MediaReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getReview(slug);
  const bodyHtml = renderEditorJs(review.content);

  return (
    <div className="container-main py-12">
      <div className="space-y-(--space-lg)">
        <header className="space-y-(--space-xs)">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {review.title}
          </h1>
          <div className="text-sm md:text-base text-slate-600 flex items-center gap-2">
            {review.author && <span>{review.author}</span>}
            {review.author && <span aria-hidden="true">·</span>}
            <span>{formatAustralianDate(review.publish_date)}</span>
          </div>
        </header>

        <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100 max-w-3xl mx-auto">
          <Image
            src={review.cover_image_url}
            alt={review.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {bodyHtml ? (
          <article
            className="prose-media max-w-none"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <article className="prose-media max-w-none">
            <p>{review.excerpt || ""}</p>
          </article>
        )}
      </div>
    </div>
  );
}
