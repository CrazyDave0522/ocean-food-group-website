import { getSupabaseServerClient } from "@/lib/supabase";
import { FranchiseForm } from "@/components/franchise/FranchiseForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Franchise — Ocean Food Group",
  description: "Franchise opportunities with Ocean Food Group.",
};

export const revalidate = 3600; // Cache for 1 hour, then regenerate in background

export default async function Page() {
  let brands: Array<{ name: string }> = [];

  try {
    const supabase = getSupabaseServerClient();

    // Fetch active brands for concept selection dropdown
    const { data: brandsData = [] } = await supabase
      .from("brand")
      .select("name")
      .eq("is_active", true)
      .order("name");

    brands = brandsData || [];
  } catch {
    // During prerendering or if Supabase is not configured,
    // gracefully fall back to empty brands array
    brands = [];
  }

  // Placeholder data for expandable cards (v3)
  const expandableCards = [
    {
      id: "1",
      title: "Initial Investment",
      icon: "/images/components/card-grid/v3/hard-drive.svg",
      text: "Starting a franchise with Ocean Food Group requires a total investment ranging from $150,000 to $300,000, depending on the concept and location. This includes franchise fees, equipment, initial inventory, and working capital."
    },
    {
      id: "2",
      title: "Royalty Structure", 
      icon: "/images/components/card-grid/v3/leaf.svg",
      text: "Our royalty structure is designed to support your success. We charge a competitive royalty fee of 6% of gross sales, plus a 2% marketing contribution to fund local and national advertising campaigns."
    },
    {
      id: "3",
      title: "Training Program",
      icon: "/images/components/card-grid/v3/org.svg",
      text: "Comprehensive training is provided to all franchise owners and their staff. This includes initial training at our corporate headquarters, followed by on-site support during your first weeks of operation."
    },
    {
      id: "4",
      title: "Ongoing Support",
      icon: "/images/components/card-grid/v3/gear.svg",
      text: "Beyond the initial setup, we provide continuous support including operational guidance, marketing assistance, supply chain management, and access to our proprietary systems and processes."
    }
  ];

  return (
    <>
      <Hero
        title="Franchise Opportunities"
        subtitle="Partner with Ocean Food Group and grow your business"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="/images/backgrounds/seefood-cartoon.jpg"
      />

      {/* Expandable Cards Section - Below Hero */}
      <div className="container-main py-12">
        <section className="py-[--space-3xl] md:py-[--space-4xl]">
          <SectionTitle title="Franchise Investment & Support" alignment="center" />
          <div className="mt-[--space-4xl]">
            <CardGrid variant="expandable" cards={expandableCards} />
          </div>
        </section>
      </div>

      <div className="container-main py-12">
        <div id="form-section">
          <FormTitle
            title="Become Our Partner"
            subtitle="If you share our passion for perfection and you would like to find out how Ocean Food Group can support you to establish and grow a successful business, then let's have a chat about your business goals."
          />
          <FormShell>
            <FranchiseForm brands={brands || []} />
          </FormShell>
        </div>
      </div>
    </>
  );
}
