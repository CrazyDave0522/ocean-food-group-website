import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "figure",
    "img",
    "figcaption",
    "a",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    a: ["http", "https", "mailto", "tel"],
    img: ["http", "https"],
  },
};

type EditorJsBlock = {
  type?: string;
  data?: Record<string, unknown>;
};

type EditorJsContent = {
  blocks?: EditorJsBlock[];
};

const clampHeadingLevel = (level: number): number => {
  if (level < 2) return 2;
  if (level > 4) return 4;
  return level;
};

const renderParagraph = (data: Record<string, unknown>): string => {
  const text = typeof data.text === "string" ? data.text : "";
  return `<p>${text}</p>`;
};

const renderHeader = (data: Record<string, unknown>): string => {
  const text = typeof data.text === "string" ? data.text : "";
  const level = clampHeadingLevel(typeof data.level === "number" ? data.level : 2);
  return `<h${level}>${text}</h${level}>`;
};

const renderList = (data: Record<string, unknown>): string => {
  const items = Array.isArray(data.items) ? data.items : [];
  const tag = data.style === "ordered" ? "ol" : "ul";
  const body = items
    .map((item) => `<li>${typeof item === "string" ? item : String(item ?? "")}</li>`)
    .join("");
  return `<${tag}>${body}</${tag}>`;
};

const renderTable = (data: Record<string, unknown>): string => {
  const content = Array.isArray(data.content) ? data.content : [];
  if (content.length === 0) return "";

  const withHeadings = Boolean(data.withHeadings);
  const renderRow = (row: unknown, cellTag: "th" | "td") => {
    if (!Array.isArray(row)) return "";
    const cells = row
      .map((cell) => `<${cellTag}>${typeof cell === "string" ? cell : String(cell ?? "")}</${cellTag}>`)
      .join("");
    const scopedCells = cellTag === "th" ? cells.replace(/<th>/g, '<th scope="col">') : cells;
    return `<tr>${scopedCells}</tr>`;
  };

  const hasHeader = withHeadings && Array.isArray(content[0]);
  const headerRow = hasHeader ? renderRow(content[0], "th") : "";
  const dataRows = (hasHeader ? content.slice(1) : content)
    .map((row) => renderRow(row, "td" as const))
    .join("");

  const thead = headerRow ? `<thead>${headerRow}</thead>` : "";
  const tbody = `<tbody>${dataRows}</tbody>`;
  return `<table>${thead}${tbody}</table>`;
};

const renderImage = (data: Record<string, unknown>): string => {
  const file = data.file as { url?: string } | undefined;
  const url = typeof file?.url === "string" ? file.url : typeof data.url === "string" ? data.url : "";
  if (!url) return "";

  const caption = typeof data.caption === "string" ? data.caption : "";
  const alt = caption || "Media review image";
  const figcaption = caption ? `<figcaption>${caption}</figcaption>` : "";
  return `<figure><img src="${url}" alt="${alt}" />${figcaption}</figure>`;
};

const renderBlock = (block: EditorJsBlock): string => {
  if (!block || typeof block !== "object") return "";
  const { type, data = {} } = block;

  switch (type) {
    case "paragraph":
      return renderParagraph(data);
    case "header":
      return renderHeader(data);
    case "list":
      return renderList(data);
    case "table":
      return renderTable(data);
    case "image":
      return renderImage(data);
    default:
      return ""; // Unsupported block types are omitted
  }
};

export function renderEditorJs(content: unknown, skipFirstBlock = true): string {
  const parsed = content as EditorJsContent;
  let blocks = Array.isArray(parsed?.blocks) ? parsed.blocks : [];
  if (blocks.length === 0) return "";

  // Skip first block if it's a header (usually a duplicate title)
  if (skipFirstBlock && blocks[0]?.type === "header") {
    blocks = blocks.slice(1);
  }

  const html = blocks.map(renderBlock).filter(Boolean).join("");

  const sanitized = sanitizeHtml(html, SANITIZE_OPTIONS);

  // Add scope attributes to table headers
  const safeHtml = sanitized.replace(/<th>([^<]*)/g, '<th scope="col">$1');

  return safeHtml;
}
