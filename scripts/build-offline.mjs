import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const distDir = path.join(projectRoot, 'dist')
const outputDir = path.join(projectRoot, 'offline')

let html = await readFile(path.join(distDir, 'index.html'), 'utf8')

const stylesheetMatch = html.match(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
)
const scriptMatch = html.match(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
)

if (!stylesheetMatch || !scriptMatch) {
  throw new Error('Could not find the built stylesheet or script.')
}

const toDistPath = (assetUrl) =>
  path.join(distDir, assetUrl.replace('/our-love-story/', ''))

const css = await readFile(toDistPath(stylesheetMatch[1]), 'utf8')
let javascript = await readFile(toDistPath(scriptMatch[1]), 'utf8')

const imagePaths = [
  ...Array.from({ length: 9 }, (_, index) =>
    `photos-web/album-${index + 1}.jpg`,
  ),
  'photos-web/frame-1.jpg',
  'photos-web/frame-2.jpg',
  'photos/couple-border-collie-cutout.png',
]

for (const imagePath of imagePaths) {
  const image = await readFile(path.join(distDir, imagePath))
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'
  const dataUrl = `data:${mimeType};base64,${image.toString('base64')}`
  javascript = javascript.replaceAll(`/our-love-story/${imagePath}`, dataUrl)
}

// The offline edition falls back to the built-in melody and photo trailer.
// Real MP3/MP4 files can stay separate because they are often too large to email.
javascript = javascript
  .replaceAll('/our-love-story/media/our-song.mp3', 'data:audio/mpeg;base64,')
  .replaceAll('/our-love-story/media/our-video.mp4', 'data:video/mp4;base64,')

html = html
  .replace(stylesheetMatch[0], () => `<style>${css}</style>`)
  .replace(
    scriptMatch[0],
    () => `<script type="module">${javascript}<\/script>`,
  )
  .replace('href="/our-love-story/favicon.svg"', 'href="data:,"')

await mkdir(outputDir, { recursive: true })
await writeFile(
  path.join(outputDir, 'our-love-story-offline.html'),
  html,
  'utf8',
)

console.log('Created offline/our-love-story-offline.html')
