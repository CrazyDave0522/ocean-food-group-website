import { SectionTitle } from "@/components/SectionTitle";
import { FeatureList } from "@/components/brands/FeatureList";
import Hero from "@/components/Hero";
import Callout from "@/components/Callout";
import CardGrid from "@/components/CardGrid";
import HeroSection from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { fetchLatestMediaReviews } from "@/lib/actions/mediaReviews";
import Image from "next/image";

export const metadata = {
  title: "Home — Ocean Food Group",
  description: "Ocean Food Group — quality seafood and franchise information.",
};

export default async function Page() {
  const brandsList = await FeatureList();

  // Fetch latest 3 published media reviews for FeatureGrid
  const mediaReviews = await fetchLatestMediaReviews();

  // Map media reviews to FeatureGrid format
  const featureGridFeatures = mediaReviews.map((review) => ({
    id: review.id,
    title: review.title,
    description:
      review.excerpt ||
      "Read our latest media coverage and industry recognition.",
    image: review.cover_image_url,
    link: `/media-reviews/${review.slug}`,
  }));

  // FeatureGrid intro content
  const featureGridIntro = {
    title: "Featured in Media",
    text: "Discover what industry experts and publications are saying about Ocean Food Group's commitment to quality, sustainability, and innovation in the seafood industry.",
    button: {
      label: "View More",
      url: "/media-reviews",
    },
  };

  // Placeholder data for feature cards (v1)
  const featureCards = [
    {
      id: "1",
      title: "Quality Seafood",
      icon: "/images/components/card-grid/v1/bird.svg",
      bulletPoints: [
        "Fresh, sustainably sourced seafood",
        "Rigorous quality control standards",
        "Premium selection available",
      ],
    },
    {
      id: "2",
      title: "Expert Support",
      icon: "/images/components/card-grid/v1/diamond.svg",
      bulletPoints: [
        "Comprehensive training programs",
        "Ongoing operational guidance",
        "Marketing and branding support",
      ],
    },
    {
      id: "3",
      title: "Proven Systems",
      icon: "/images/components/card-grid/v1/globe.svg",
      bulletPoints: [
        "Established operational procedures",
        "Inventory management systems",
        "Customer service protocols",
      ],
    },
    {
      id: "4",
      title: "Growth Opportunity",
      icon: "/images/components/card-grid/v1/rocket.svg",
      bulletPoints: [
        "Expanding market presence",
        "Multiple location potential",
        "Scalable business model",
      ],
    },
  ];

  // Placeholder data for image cards (v2)
  const imageCards = [
    {
      id: "1",
      title: "Franklin Roosevelt",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/FDR_1944_Color_Portrait.jpg",
      text: "The 32nd President of the United States",
    },
    {
      id: "2",
      title: " Herbert Hoover",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/57/President_Hoover_portrait.jpg",
      text: "The 31st President of the United States",
    },
    {
      id: "3",
      title: " Dwight D. Eisenhower",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg",
      text: "The 34th President of the United States",
    },
    {
      id: "4",
      title: " Harry S. Truman",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/TRUMAN_58-766-06_%28cropped%29.jpg/500px-TRUMAN_58-766-06_%28cropped%29.jpg",
      text: "The 33rd President of the United States",
    },
  ];

  return (
    <>
      <Hero
        title="Welcome to Ocean Food Group"
        subtitle="Quality seafood and franchise opportunities"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="/images/backgrounds/ocean-blue.jpg"
        overlay={false}
      />

      {/* Feature Cards Section - Below Hero */}
      <section className="relative py-12">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source
            media="(max-width: 767px)"
            srcSet="/images/section-backgrounds/home-card-grid-mb.png"
          />
          <Image
            src="/images/section-backgrounds/home-card-grid.png"
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
            <SectionTitle
              title="Why Choose Ocean Food Group"
              alignment="center"
            />
            <div className="mt-[--space-4xl]">
              <CardGrid variant="feature" cards={featureCards} />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      {brandsList && (
        <section className="relative pt-12 mt-[--space-4xl] md:mt-[--space-5xl]">
          {/* Content */}
          <div className="container-main relative z-10">
            <div className="py-[--space-3xl] md:py-[--space-4xl]">
              <SectionTitle title="Our Brands" alignment="center" />
              <div className="mt-[--space-4xl]">{brandsList}</div>
            </div>
          </div>
        </section>
      )}
      <Callout
        text="Partner with us and grow your business"
        buttonText="Start Franchising"
        buttonUrl="/franchise"
      />
      <div className="container-main pb-12">
        {/* Image Cards Section - Below Brands */}
        <section className="py-[--space-3xl] md:py-[--space-4xl] mt-[--space-4xl] md:mt-[--space-5xl] relative">
          {/* Background Image - Full Width */}
          <div
            className="absolute"
            style={{
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
              width: "100vw",
              height: "100%",
              background:
                "linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%)",
              opacity: 0.6,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <SectionTitle title="Our Team" alignment="center" />
            <div className="mt-[--space-4xl]">
              <CardGrid variant="image" cards={imageCards} />
            </div>
          </div>
        </section>
      </div>

      {/* Hero Section - Below Our Team */}
      <HeroSection
        backgroundImageUrl="/images/backgrounds/bg-hero-section.png"
        mobileBackgroundImageUrl="/images/backgrounds/bg-hero-section-mb.png"
        title="Excellence in Seafood"
        text="Discover our commitment to quality, sustainability, and innovation in the seafood industry. From farm to table, we ensure every product meets the highest standards of freshness and taste."
      />

      {/* FeatureGrid Section - Below Callout */}
      <div
        className="container-main py-12 feature-grid-container"
        style={{
          background:
            "radial-gradient(ellipse at bottom center, rgba(0, 84, 255, 0.50) 0%, rgba(0, 84, 255, 0.3) 30%, rgba(0, 84, 255, 0.1) 60%, transparent 100%)",
        }}
      >
        <section className="py-[--space-3xl] md:py-[--space-4xl] relative">
          <div className="relative z-10">
            <div className="mt-[--space-4xl]">
              <FeatureGrid
                intro={featureGridIntro}
                features={featureGridFeatures}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
