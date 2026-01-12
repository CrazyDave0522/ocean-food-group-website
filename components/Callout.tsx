import Link from "next/link";
import Image from "next/image";

interface CalloutProps {
  text: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl?: string;
  alt?: string;
}

export default function Callout({
  text,
  buttonText,
  buttonUrl,
  imageUrl,
  alt,
}: CalloutProps) {
  const isInternal = buttonUrl.startsWith("/");

  return (
    <div className="callout">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt || ""}
          fill
          className="callout-background"
          onError={(e) => {
            // Fallback to default background
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <div className="callout-content">
        <p className="callout-text">{text}</p>
        <div className="callout-gap" />
        {isInternal ? (
          <Link href={buttonUrl} className="callout-button">
            {buttonText}
          </Link>
        ) : (
          <a
            href={buttonUrl}
            className="callout-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
