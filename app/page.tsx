import { SectionTitle } from "@/components/SectionTitle";
import { FeatureList } from "@/components/brands/FeatureList";
import Hero from "@/components/Hero";
import Callout from "@/components/Callout";

export const metadata = {
  title: "Home — Ocean Food Group",
  description: "Ocean Food Group — quality seafood and franchise information.",
};

export default async function Page() {
  const brandsList = await FeatureList();

  return (
    <>
      <Hero
        title="Welcome to Ocean Food Group"
        subtitle="Quality seafood and franchise opportunities"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="/images/backgrounds/ocean-blue.jpg"
      />

      <div className="container-main py-12">
        {/* Brands Section */}
        {brandsList && (
          <section className="py-[--space-3xl] md:py-[--space-4xl] mt-[--space-4xl] md:mt-[--space-5xl]">
            <SectionTitle title="Our Brands" alignment="center" />
            <div className="mt-[--space-4xl]">{brandsList}</div>
          </section>
        )}
      </div>
      <Callout
        text="Partner with Ocean Food Group and grow your business"
        buttonText="Start Franchising"
        buttonUrl="/franchise"
      />
    </>
  );
}
