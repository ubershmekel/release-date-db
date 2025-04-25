export interface PageYaml {
  name: string
  creator: string
  slug: string
  releases: Release[]
}

export interface Release {
  title: string
  platform: string
  release_date: Date
}
