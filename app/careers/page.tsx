import { fetchPublishedJobPostings } from "@/lib/actions/jobPostings";
import { JobPostingsList } from "@/components/job-postings/JobPostingsList";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";

export const metadata = {
  title: "Careers — Ocean Food Group",
  description: "Careers and job opportunities at Ocean Food Group.",
};

export default async function Page() {
  const result = await fetchPublishedJobPostings(0, 10);

  // Placeholder data for centered cards (v4)
  const centeredCards = [
    {
      id: "1",
      title: "Great Culture",
      text: "Work in a supportive environment where your contributions are valued and your professional growth is encouraged.",
    },
    {
      id: "2",
      title: "Competitive Benefits",
      text: "Enjoy comprehensive benefits including health insurance, paid time off, retirement plans, and professional development opportunities.",
    },
    {
      id: "3",
      title: "Career Growth",
      text: "Advance your career with clear paths for promotion, skill development, and leadership opportunities within our growing organization.",
    },
    {
      id: "4",
      title: "Work-Life Balance",
      text: "We prioritize work-life balance with flexible scheduling options and a culture that respects your personal time and well-being.",
    },
  ];

  if (result.error) {
    return (
      <>
        <Hero
          title="Join Our Team"
          subtitle="Explore career opportunities at Ocean Food Group"
          variant="center"
          backgroundType="image"
          backgroundImageUrl="/images/backgrounds/hero-future.png"
          overlay={false}
        />

        {/* Centered Cards Section - Below Hero */}
        <div className="container-main py-12">
          <section className="py-[--space-3xl] md:py-[--space-4xl]">
            <SectionTitle title="Why Work With Us" alignment="center" />
            <div className="mt-[--space-4xl]">
              <CardGrid variant="centered" cards={centeredCards} />
            </div>
          </section>
        </div>

        <div className="container-main py-12">
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
        backgroundImageUrl="/images/backgrounds/hero-future.png"
        overlay={false}
      />

      {/* Centered Cards Section - Below Hero */}
      <section className="relative py-12">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source
            media="(max-width: 767px)"
            srcSet="/images/section-backgrounds/contact-form-mb.png"
          />
          <Image
            src="/images/section-backgrounds/career-card-grid.png"
            alt=""
            fill
            className="object-cover"
            priority={false}
            aria-hidden="true"
          />
        </picture>

        {/* Content */}
        <div className="container-main relative z-10">
          <div className="py-[--space-3xl] md:py-[--space-4xl]">
            <SectionTitle title="Why Work With Us" alignment="center" />
            <div className="mt-[--space-4xl]">
              <CardGrid variant="centered" cards={centeredCards} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-8 job-postings-section-container">
        <JobPostingsList
          initialItems={result.items}
          initialHasMore={result.hasMore}
          onFetchMore={fetchPublishedJobPostings}
        />
      </div>
    </>
  );
}
