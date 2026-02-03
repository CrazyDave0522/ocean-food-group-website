import { ContactForm } from "@/components/contact/ContactForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";
import Hero from "@/components/Hero";
import Image from "next/image";

export const metadata = {
  title: "Contact — Ocean Food Group",
  description: "Contact Ocean Food Group for general inquiries.",
};

export default function Page() {
  return (
    <>
      <Hero
        title="Get In Touch"
        subtitle="We'd love to hear from you"
        variant="center"
        backgroundType="image"
        backgroundImageUrl="/images/backgrounds/hero-fishing.png"
        mobileBackgroundImageUrl="/images/backgrounds/hero-fishing-mb.png"
        overlay={false}
      />

      <section className="relative py-12">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source
            media="(max-width: 767px)"
            srcSet="/images/section-backgrounds/contact-form-mb.png"
          />
          <Image
            src="/images/section-backgrounds/contact-form.png"
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
              title="Reach Out To Us"
              subtitle="Have any comments, feedback or media inquiries? Get in touch with us below!"
              titleColor="text-gray-900"
              subtitleColor="text-gray-600"
            />
            <FormShell>
              <ContactForm />
            </FormShell>
          </div>
        </div>
      </section>
    </>
  );
}
