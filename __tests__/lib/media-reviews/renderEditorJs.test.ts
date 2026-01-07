import { describe, it, expect } from "vitest";
import { renderEditorJs } from "@/lib/media-reviews/renderEditorJs";

describe("renderEditorJs", () => {
  it("skips first block if it's a header (duplicate title)", () => {
    const html = renderEditorJs({
      blocks: [
        { type: "header", data: { text: "Why Sustainable Seafood Matters", level: 2 } },
        { type: "paragraph", data: { text: "Hello world" } },
      ],
    });

    expect(html).not.toContain("Why Sustainable Seafood Matters");
    expect(html).toContain("<p>Hello world</p>");
  });

  it("renders paragraph and headers when skipFirstBlock is false", () => {
    const html = renderEditorJs(
      {
        blocks: [
          { type: "header", data: { text: "Section", level: 2 } },
          { type: "paragraph", data: { text: "Hello world" } },
        ],
      },
      false
    );

    expect(html).toContain("<h2>Section</h2>");
    expect(html).toContain("<p>Hello world</p>");
  });

  it("renders ordered and unordered lists", () => {
    const html = renderEditorJs(
      {
        blocks: [
          { type: "list", data: { style: "unordered", items: ["A", "B"] } },
          { type: "list", data: { style: "ordered", items: ["1", "2"] } },
        ],
      },
      false
    );

    expect(html).toContain("<ul><li>A</li><li>B</li></ul>");
    expect(html).toContain("<ol><li>1</li><li>2</li></ol>");
  });

  it("renders table with headings and scope attributes", () => {
    const html = renderEditorJs(
      {
        blocks: [
          {
            type: "table",
            data: {
              withHeadings: true,
              content: [
                ["Stage", "Outcome"],
                ["Prep", "Ready"],
              ],
            },
          },
        ],
      },
      false
    );

    expect(html).toContain("<thead><tr><th scope=\"col\">Stage</th><th scope=\"col\">Outcome</th></tr></thead>");
    expect(html).toContain("<tbody><tr><td>Prep</td><td>Ready</td></tr></tbody>");
  });

  it("sanitizes malicious content", () => {
    const html = renderEditorJs(
      {
        blocks: [
          {
            type: "paragraph",
            data: { text: "<script>alert('xss')</script><a href=\"javascript:alert(1)\">link</a>" },
          },
        ],
      },
      false
    );

    expect(html).not.toContain("<script>");
    expect(html).not.toMatch(/javascript:alert/i);
    expect(html).toContain("<a ");
  });

  it("omits unsupported blocks", () => {
    const html = renderEditorJs(
      {
        blocks: [
          { type: "unknown", data: { text: "skip" } },
          { type: "paragraph", data: { text: "keep" } },
        ],
      },
      false
    );

    expect(html).toContain("<p>keep</p>");
    expect(html).not.toContain("skip");
  });

  it("returns empty string for empty blocks", () => {
    expect(renderEditorJs({ blocks: [] })).toBe("");
  });
});
