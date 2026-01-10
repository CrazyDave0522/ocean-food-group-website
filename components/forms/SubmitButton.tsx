"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  loadingLabel?: string;
  className?: string;
};

export function SubmitButton({
  label,
  loadingLabel = "Submitting...",
  className = "",
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? loadingLabel : label}
    </button>
  );
}
