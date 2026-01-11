import { ContactForm } from "@/components/contact/ContactForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";
import Hero from "@/components/Hero";

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
        variant="left"
        backgroundType="image"
        backgroundImageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=540&fit=crop"
        contentImageUrl="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=414&h=332&fit=crop"
      />

      <div className="container-main py-12">
        <div id="form-section">
          <FormTitle
            title="Reach Out To Us"
            subtitle="Have any comments, feedback or media inquiries? Get in touch with us below!"
          />
          <FormShell>
            <ContactForm />
          </FormShell>
        </div>
      </div>
    </>
  );
}
