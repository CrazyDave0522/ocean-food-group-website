import { getSupabaseServerClient } from "@/lib/supabase";
import { FranchiseForm } from "@/components/franchise/FranchiseForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";
import Hero from "@/components/Hero";

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

  return (
    <>
      <Hero
        title="Franchise Opportunities"
        subtitle="Partner with Ocean Food Group and grow your business"
        variant="center"
        backgroundType="styled"
        backgroundVariant="solid"
      />

      <div className="container mx-auto px-4 py-12">
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
