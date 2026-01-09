import { SectionTitle } from "@/components/SectionTitle";
import { BrandsList } from "@/components/brands/BrandsList";

export const metadata = {
  title: "Home — Ocean Food Group",
  description: "Ocean Food Group — quality seafood and franchise information.",
};

export default async function Page() {
  const brandsList = await BrandsList();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Welcome to Ocean Food Group</h1>
      <p className="mt-4">
        This is the home page. Learn about our franchise, media reviews,
        careers, and more.
      </p>

      {/* Brands Section */}
      {brandsList && (
        <section className="py-[--space-3xl] md:py-[--space-4xl] mt-[--space-4xl] md:mt-[--space-5xl]">
          <SectionTitle
            title="Our Brands"
            alignment="center"
          />
          <div className="mt-[--space-4xl]">
            {brandsList}
          </div>
        </section>
      )}
    </div>
  );
}
