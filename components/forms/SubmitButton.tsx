"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  loadingLabel?: string;
  className?: string;
  variant?: "standard" | "glassmorphism";
};

export function SubmitButton({
  label,
  loadingLabel = "Submitting...",
  className = "",
  variant = "standard",
}: Props) {
  const { pending } = useFormStatus();

  const baseClasses = "inline-flex min-w-[160px] aspect-[6] items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70";
  
  const variantClasses = variant === "glassmorphism" 
    ? "bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white"
    : "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {pending ? loadingLabel : label}
    </button>
  );
}
