import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function FormShell({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        {children}
      </div>
    </section>
  );
}
