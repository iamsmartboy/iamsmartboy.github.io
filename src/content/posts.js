const modules = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' })

function parseFrontmatter(raw, path) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  const data = {}
  if (match) {
    match[1].split(/\r?\n/).forEach((line) => {
      const separator = line.indexOf(':')
      if (separator > -1) data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
    })
  }
  return {
    slug: path.split('/').pop().replace('.md', ''),
    ...data,
    body: match ? match[2] : raw,
  }
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => parseFrontmatter(raw, path))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const categories = ['全部', ...new Set(posts.map((post) => post.category))]
