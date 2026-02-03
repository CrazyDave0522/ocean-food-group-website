import { FranchiseForm } from "@/components/franchise/FranchiseForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";

export const metadata = {
  title: "Franchise — Ocean Food Group",
  description: "Franchise opportunities with Ocean Food Group.",
};

export const revalidate = 3600; // Cache for 1 hour, then regenerate in background

export default async function Page() {
  // Placeholder data for expandable cards (v3)
  const expandableCards = [
    {
      id: "1",
      title: "Initial Investment",
      icon: "/images/components/card-grid/v3/hard-drive.svg",
      text: "• Franchise Fee: $50,000 - $100,000 (varies by concept)\n• Equipment & Leasehold Improvements: $75,000 - $150,000\n• Initial Inventory & Supplies: $25,000 - $50,000\n• Working Capital (3-6 months): $25,000 - $50,000\n• Grand Opening Marketing: $10,000 - $20,000\n• Professional Fees & Permits: $5,000 - $10,000",
    },
    {
      id: "2",
      title: "Royalty Structure",
      icon: "/images/components/card-grid/v3/leaf.svg",
      text: "• Royalty Fee: 6% of gross sales (paid weekly/monthly)\n• Marketing Contribution: 2% of gross sales\n• National Advertising Fund access included\n• Local marketing co-op opportunities available\n• No hidden fees or unexpected charges\n• Transparent reporting and payment systems",
    },
    {
      id: "3",
      title: "Training Program",
      icon: "/images/components/card-grid/v3/org.svg",
      text: "• 2-week initial training at corporate headquarters\n• Hands-on kitchen and operations training\n• Business management and financial training\n• Marketing and customer service training\n• On-site opening support (first 2 weeks)\n• Ongoing refresher training sessions\n• Manager certification programs available",
    },
    {
      id: "4",
      title: "Ongoing Support",
      icon: "/images/components/card-grid/v3/gear.svg",
      text: "• 24/7 operational hotline support\n• Dedicated franchise business consultant\n• Monthly performance reviews and coaching\n• Marketing materials and campaign support\n• Supply chain and vendor relationship management\n• Technology platform access and training\n• Annual franchisee conferences and networking",
    },
  ];

  return (
    <>
      <Hero
        title="Franchise Opportunities"
        subtitle="Partner with Ocean Food Group and grow your business"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="/images/backgrounds/hero-profession.png"
        mobileBackgroundImageUrl="/images/backgrounds/hero-profession-mb.png"
        overlay={false}
      />

      {/* Expandable Cards Section - Below Hero */}
      <div className="container-main py-12">
        <section className="py-[--space-3xl] md:py-[--space-4xl]">
          <SectionTitle
            title="Franchise Investment & Support"
            alignment="center"
          />
          <div className="mt-[--space-4xl]">
            <CardGrid variant="expandable" cards={expandableCards} />
          </div>
        </section>
      </div>

      <section className="relative py-12">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source
            media="(max-width: 767px)"
            srcSet="/images/section-backgrounds/franchise-form-mb.png"
          />
          <Image
            src="/images/section-backgrounds/franchise-form.png"
            alt=""
            fill
            className="object-cover"
            priority={false}
            aria-hidden="true"
          />
        </picture>

        {/* Content */}
        <div className="container-main relative z-10">
          <div id="form-section">
            <FormTitle
              title="Become Our Partner"
              subtitle="If you share our passion for perfection and you would like to find out how Ocean Food Group can support you to establish and grow a successful business, then let's have a chat about your business goals."
            />
            <FormShell>
              <FranchiseForm />
            </FormShell>
          </div>
        </div>
      </section>

      {/* Franchise Form Footer */}
      <section className="relative md:hidden">
        <Image
          src="/images/section-backgrounds/franchise-form-footer.png"
          alt=""
          width={750}
          height={118}
          className="w-full h-auto"
          priority={false}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
