import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logos/Ocean-Food-bg-cropped.png"
            alt="Ocean Food Group"
            width={120}
            height={42}
            priority
          />
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/media-reviews">Media Reviews</Link>
            </li>
            <li>
              <Link href="/franchise">Franchise</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
