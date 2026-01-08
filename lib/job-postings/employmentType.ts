import type { EmploymentType } from "./types";

export function formatEmploymentType(type: EmploymentType | string): string {
  const labels: Record<string, string> = {
    full_time: "Full Time",
    part_time: "Part Time",
    casual: "Casual",
    contract: "Contract",
    intern: "Intern",
  };

  return labels[type] || type;
}
