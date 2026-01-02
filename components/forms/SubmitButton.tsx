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
      className={`inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? loadingLabel : label}
    </button>
  );
}