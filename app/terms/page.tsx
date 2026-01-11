import fs from "fs/promises";
import path from "path";
import type { ReactElement } from "react";
import { parse } from "marked";
import sanitizeHtml from "sanitize-html";

export const revalidate = 0;

export const metadata = {
  title: "Terms & Conditions — Ocean Food Group",
  description: "Terms and conditions for using Ocean Food Group website.",
};

export default async function Page(): Promise<ReactElement> {
  const filePath = path.join(process.cwd(), "public", "legal", "terms.md");
  let md = "# Terms and Conditions\n\nTerms content not found.";
  try {
    md = await fs.readFile(filePath, "utf8");
  } catch {
    /* fallback message */
  }

  const rawContent = parse(md, { mangle: false, headerIds: false });
  const content = sanitizeHtml(rawContent);

  return (
    <div className="container-main py-12">
      <div
        className="prose-legal"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
