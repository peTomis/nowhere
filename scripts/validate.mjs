// Content validation from the command line (docs/data-model.md §8): the same checks that run
// during `yarn build`, for every guide and the template. Exit code 1 on errors.
// Usage: yarn validate
import { createJiti } from 'jiti'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
// `server-only` throws outside a React Server environment: the script is server-side anyway.
const serverOnly = join(root, 'node_modules/server-only/empty.js')
const jiti = createJiti(import.meta.url, {
  jsx: { runtime: 'automatic' },
  fsCache: false,
  alias: { '@': root, 'server-only': serverOnly },
})

const { validateGuide, formatIssues } = await jiti.import('@/lib/content/validate.ts')
const { guideContent } = await jiti.import('@/content/guides.ts')
const { template } = await jiti.import('@/content/xx/it/guide.tsx')

let errors = 0
for (const [slug, content] of Object.entries({ ...guideContent, template })) {
  const issues = validateGuide(slug, content)
  const e = issues.filter((i) => i.level === 'error').length
  errors += e
  console.log(`${e ? '✗' : '✓'} ${slug}: ${e} error(s), ${issues.length - e} warning(s)`)
  if (issues.length) console.log(formatIssues(issues))
}
process.exit(errors ? 1 : 0)
