const modules = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' })
const imageModules = import.meta.glob('./posts/图片/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true, query: '?url', import: 'default' })

const imageUrls = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.replace('./posts/', ''), url]),
)

function resolveImagePath(path) {
  const normalized = path.replaceAll('\\', '/').replace(/^\.?\//, '')
  return imageUrls[normalized] || path
}

function resolveMarkdownImages(body) {
  return body.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (_, start, path, end) => `${start}${resolveImagePath(path)}${end}`)
}

function parseFrontmatter(raw, path) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  const data = {}
  if (match) {
    match[1].split(/\r?\n/).forEach((line) => {
      const separator = line.indexOf(':')
      if (separator > -1) data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
    })
  }
  if (data.cover) data.cover = resolveImagePath(data.cover)
  return {
    slug: path.split('/').pop().replace('.md', ''),
    ...data,
    body: resolveMarkdownImages(match ? match[2] : raw),
  }
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => parseFrontmatter(raw, path))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const categories = ['全部', ...new Set(posts.map((post) => post.category))]
