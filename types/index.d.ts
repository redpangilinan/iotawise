export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  ogImage: string
}

export type ContactConfig = {
  email: string
}
