import { describe, it, expect } from "vitest";
import { formatEmploymentType } from "@/lib/job-postings/employmentType";

describe("formatEmploymentType", () => {
  it("converts full_time to Full Time", () => {
    expect(formatEmploymentType("full_time")).toBe("Full Time");
  });

  it("converts part_time to Part Time", () => {
    expect(formatEmploymentType("part_time")).toBe("Part Time");
  });

  it("converts casual to Casual", () => {
    expect(formatEmploymentType("casual")).toBe("Casual");
  });

  it("converts contract to Contract", () => {
    expect(formatEmploymentType("contract")).toBe("Contract");
  });

  it("converts intern to Intern", () => {
    expect(formatEmploymentType("intern")).toBe("Intern");
  });

  it("returns original value for unknown types", () => {
    expect(formatEmploymentType("unknown_type")).toBe("unknown_type");
  });
});
