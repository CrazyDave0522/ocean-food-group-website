import fs from 'fs/promises'
import path from 'path'
import type { ReactElement } from 'react'
import { parse } from 'marked'

export const revalidate = 0

export const metadata = {
  title: 'Privacy Policy — Ocean Food Group',
  description: 'Privacy policy for Ocean Food Group website.',
}

export default async function Page(): Promise<ReactElement> {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'privacy.md')
  let md = '# Privacy Policy\n\nPrivacy content not found.'
  try {
    md = await fs.readFile(filePath, 'utf8')
  } catch {
    /* fallback message kept above */
  }
  const content = parse(md, { mangle: false, headerIds: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
