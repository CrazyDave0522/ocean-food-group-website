import { ContactForm } from "@/components/contact/ContactForm";
import { FormShell } from "@/components/forms/FormShell";

export const metadata = {
  title: "Contact — Ocean Food Group",
  description: "Contact Ocean Food Group for general inquiries.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FormShell
        title="Reach Out To Us"
        description="Have any comments, feedback or media inquiries? Get in touch with us below!"
      >
        <ContactForm />
      </FormShell>
    </div>
  );
}
