import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormShell({ title, description, children }: Props) {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          {description ? (
            <p className="text-gray-600">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}