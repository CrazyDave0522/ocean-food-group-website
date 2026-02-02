type Props = {
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
};

export function FormTitle({ title, subtitle, titleColor = "text-white", subtitleColor = "text-gray-200" }: Props) {
  return (
    <div className="mb-8 space-y-3">
      <h1 className={`text-[32px] font-semibold text-center ${titleColor}`}>{title}</h1>
      {subtitle ? <p className={`text-[16px] text-center ${subtitleColor}`}>{subtitle}</p> : null}
    </div>
  );
}
