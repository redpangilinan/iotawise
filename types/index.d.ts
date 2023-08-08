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

export type NavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: string
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type Navigation = {
  data: NavItem[]
}
