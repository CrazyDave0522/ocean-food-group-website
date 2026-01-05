import { ContactForm } from "@/components/contact/ContactForm";
import { FormShell } from "@/components/forms/FormShell";
import { FormTitle } from "@/components/forms/FormTitle";

export const metadata = {
  title: "Contact — Ocean Food Group",
  description: "Contact Ocean Food Group for general inquiries.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
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
  );
}
