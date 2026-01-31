import Link from "next/link";

interface GlassmorphismButtonProps {
  label: string;
  url?: string;
  className?: string;
}

export default function GlassmorphismButton({
  label,
  url,
  className = "",
}: GlassmorphismButtonProps) {
  const buttonClasses = `inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 aspect-[240/38] border border-white/50 bg-white/50 backdrop-blur-sm rounded-2xl text-white font-normal text-sm shadow-[0_2px_0_0_rgba(4,20,51,0.3)] hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors ${className}`;

  if (url) {
    const isExternal = url.startsWith("http") || url.startsWith("//");

    if (isExternal) {
      return (
        <a
          href={url}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }

    return (
      <Link href={url} className={buttonClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonClasses}>
      {label}
    </button>
  );
}
