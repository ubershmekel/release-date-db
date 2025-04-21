export interface PageYaml {
  name: string
  company: string
  slug: string
  releases: Release[]
}

export interface Release {
  title: string
  platform: string
  release_date: Date
}
