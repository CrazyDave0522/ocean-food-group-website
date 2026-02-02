import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function FormShell({ children }: Props) {
  return (
    <section>
      <div className="rounded-2xl bg-transparent p-6 shadow-sm md:p-8">
        {children}
      </div>
    </section>
  );
}
