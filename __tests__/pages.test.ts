import home from '../app/page'
import media from '../app/media-reviews/page'
import franchise from '../app/franchise/page'
import careers from '../app/careers/page'
import contact from '../app/contact/page'
import terms from '../app/terms/page'
import privacy from '../app/privacy/page'

describe('page metadata exports', () => {
  test('home has metadata.title', () => {
    expect(home.metadata?.title || home.default?.metadata?.title).toBeTruthy()
  })

  test('media reviews has metadata.title', () => {
    expect(media.metadata?.title).toBeTruthy()
  })

  test('franchise has metadata.title', () => {
    expect(franchise.metadata?.title).toBeTruthy()
  })

  test('careers has metadata.title', () => {
    expect(careers.metadata?.title).toBeTruthy()
  })

  test('contact has metadata.title', () => {
    expect(contact.metadata?.title).toBeTruthy()
  })

  test('terms has metadata.title', () => {
    expect(terms.metadata?.title).toBeTruthy()
  })

  test('privacy has metadata.title', () => {
    expect(privacy.metadata?.title).toBeTruthy()
  })
})
