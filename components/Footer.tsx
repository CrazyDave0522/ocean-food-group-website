import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-sm">© {new Date().getFullYear()} Ocean Food Group</div>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-4 text-sm">
            <li><Link href="/terms">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
