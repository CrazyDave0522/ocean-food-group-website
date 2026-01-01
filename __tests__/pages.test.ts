import * as home from '../app/page'
import * as media from '../app/media-reviews/page'
import * as franchise from '../app/franchise/page'
import * as careers from '../app/careers/page'
import * as contact from '../app/contact/page'
import * as terms from '../app/terms/page'
import * as privacy from '../app/privacy/page'

function getMetadataTitle(mod: unknown): string | undefined {
  if (!mod || typeof mod !== 'object') return undefined
  const m = mod as Record<string, unknown>
  const maybeMeta = m.metadata as Record<string, unknown> | undefined
  if (maybeMeta && typeof maybeMeta.title === 'string') return maybeMeta.title as string
  const def = m.default as Record<string, unknown> | undefined
  const defMeta = def?.metadata as Record<string, unknown> | undefined
  if (defMeta && typeof defMeta.title === 'string') return defMeta.title as string
  return undefined
}

describe('page metadata exports', () => {
  test('home has metadata.title', () => {
     const meta = getMetadataTitle(home)
    expect(meta).toBeTruthy()
  })

  test('media reviews has metadata.title', () => {
    expect(getMetadataTitle(media)).toBeTruthy()
  })

  test('franchise has metadata.title', () => {
    expect(getMetadataTitle(franchise)).toBeTruthy()
  })

  test('careers has metadata.title', () => {
    expect(getMetadataTitle(careers)).toBeTruthy()
  })

  test('contact has metadata.title', () => {
    expect(getMetadataTitle(contact)).toBeTruthy()
  })

  test('terms has metadata.title', () => {
    expect(getMetadataTitle(terms)).toBeTruthy()
  })

  test('privacy has metadata.title', () => {
    expect(getMetadataTitle(privacy)).toBeTruthy()
  })
})
