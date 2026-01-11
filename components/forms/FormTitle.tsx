type Props = {
  title: string;
  subtitle?: string;
};

export function FormTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-8 space-y-3">
      <h1 className="text-3xl font-semibold text-gray-900 text-center">{title}</h1>
      {subtitle ? <p className="text-gray-600 text-center">{subtitle}</p> : null}
    </div>
  );
}
