import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

interface SitemapEntry {
  name: string
  link: string
  category: string
}

async function generateSitemap() {
  const dataDir = path.join(__dirname, '../../data')
  const outputDir = path.join(__dirname, '..', 'public')
  const sitemap: SitemapEntry[] = []

  function traverseDir(dir: string) {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverseDir(filePath)
      } else if (path.extname(file) === '.yml') {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const data = yaml.load(fileContent) as { name: string; slug: string }
          if (data && data.name && data.slug) {
            const category = path.basename(dir)
            const link = `/rd/${category}/${data.slug}`
            sitemap.push({ name: data.name, link, category })
            console.log(`Added ${filePath} to sitemap`)
          } else {
            console.warn(`Skipping ${filePath}: name or slug missing`)
          }
        } catch (error) {
          console.error(`⚠️Error reading or parsing ${filePath}:`, error)
          // Exit so we notice this failure
          process.exit(1)
        }
      }
    })
  }

  traverseDir(dataDir)

  const sitemapJSON = JSON.stringify(sitemap, null, 2)
  fs.writeFileSync(path.join(outputDir, 'sitemap.json'), sitemapJSON)

  console.log('Sitemap generated successfully!')
}

generateSitemap()
