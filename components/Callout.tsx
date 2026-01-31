import Image from "next/image";
import GlassmorphismButton from "./GlassmorphismButton";

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
        <GlassmorphismButton label={buttonText} url={buttonUrl} />
      </div>
    </div>
  );
}
