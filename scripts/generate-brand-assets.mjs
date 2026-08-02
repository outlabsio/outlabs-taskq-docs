#!/usr/bin/env bun
/**
 * Derive docs-site brand assets from public/tasq.svg (Pixelmator wordmark).
 * - Wordmark light/dark: task letters adapt; orange Q stays #ff634d
 * - Icon + favicons: orange Q mark only
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const sourcePath = join(publicDir, 'tasq.svg')
const BRAND_ORANGE = '#ff634d'
const LIGHT_INK = '#0a0a0a'
const DARK_INK = '#ffffff'

const source = readFileSync(sourcePath, 'utf8')
const pathRe = /<path\b[^>]*\bd="([^"]+)"[^>]*\/>/g
const paths = [...source.matchAll(pathRe)].map(match => match[1])
if (paths.length < 2) {
  throw new Error(`Expected 2 paths in ${sourcePath}, found ${paths.length}`)
}

const [wordmarkPath, cuePath] = paths

function wordmarkSvg(ink) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1304 393" fill="none" role="img" aria-label="OutlabsTaskq">
  <path fill="${ink}" fill-rule="evenodd" d="${wordmarkPath}"/>
  <path fill="${BRAND_ORANGE}" fill-rule="evenodd" d="${cuePath}"/>
</svg>
`
}

// Q bbox from path absolute coords (padded).
const Q_VIEWBOX = '988 74 326 329'

function iconSvg({ padded = true } = {}) {
  const pad = padded
    ? `<rect width="100%" height="100%" fill="none"/>`
    : ''
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${Q_VIEWBOX}" fill="none" role="img" aria-label="OutlabsTaskq">
  ${pad}
  <path fill="${BRAND_ORANGE}" fill-rule="evenodd" d="${cuePath}"/>
</svg>
`
}

/** Square app icon: orange Q centered on transparent (or solid) canvas. */
function appIconSvg(size, { background = null } = {}) {
  const vb = Q_VIEWBOX.split(' ').map(Number)
  const [qx, qy, qw, qh] = vb
  const margin = size * 0.12
  const scale = Math.min((size - margin * 2) / qw, (size - margin * 2) / qh)
  const tw = qw * scale
  const th = qh * scale
  const tx = (size - tw) / 2 - qx * scale
  const ty = (size - th) / 2 - qy * scale
  const bg = background
    ? `<rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${background}"/>`
    : ''
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${bg}
  <g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(6)})">
    <path fill="${BRAND_ORANGE}" fill-rule="evenodd" d="${cuePath}"/>
  </g>
</svg>
`
}

function rasterize(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width }
  })
  return Buffer.from(resvg.render().asPng())
}

writeFileSync(join(publicDir, 'outlabsTaskqLogo.svg'), wordmarkSvg(LIGHT_INK))
writeFileSync(join(publicDir, 'outlabsTaskqLogo-dark.svg'), wordmarkSvg(DARK_INK))
writeFileSync(join(publicDir, 'outlabsTaskqIcon.svg'), iconSvg())
writeFileSync(join(publicDir, 'outlabsTaskqIcon-mark.svg'), appIconSvg(128, { background: null }))

const faviconSvg = appIconSvg(512, { background: null })
const appleSvg = appIconSvg(180, { background: '#0a0a0a' })

const png32 = await sharp(rasterize(faviconSvg, 32)).png().toBuffer()
const png16 = await sharp(rasterize(faviconSvg, 16)).png().toBuffer()
const png180 = await sharp(rasterize(appleSvg, 180)).png().toBuffer()

writeFileSync(join(publicDir, 'favicon-32x32.png'), png32)
writeFileSync(join(publicDir, 'apple-touch-icon.png'), png180)
writeFileSync(
  join(publicDir, 'favicon.ico'),
  buildIco([
    { size: 16, png: png16 },
    { size: 32, png: png32 }
  ])
)

console.log('Brand assets written to public/:')
for (const name of [
  'outlabsTaskqLogo.svg',
  'outlabsTaskqLogo-dark.svg',
  'outlabsTaskqIcon.svg',
  'outlabsTaskqIcon-mark.svg',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'favicon.ico'
]) {
  console.log(`  - ${name}`)
}

function buildIco(entries) {
  // ICONDIR + ICONDIRENTRY[] + image data (PNG payloads)
  const headerSize = 6
  const entrySize = 16
  const offset0 = headerSize + entrySize * entries.length
  let offset = offset0
  const offsets = []
  for (const entry of entries) {
    offsets.push(offset)
    offset += entry.png.length
  }
  const buf = Buffer.alloc(offset)
  buf.writeUInt16LE(0, 0) // reserved
  buf.writeUInt16LE(1, 2) // type icon
  buf.writeUInt16LE(entries.length, 4)
  entries.forEach((entry, i) => {
    const o = headerSize + i * entrySize
    buf.writeUInt8(entry.size >= 256 ? 0 : entry.size, o)
    buf.writeUInt8(entry.size >= 256 ? 0 : entry.size, o + 1)
    buf.writeUInt8(0, o + 2) // colors
    buf.writeUInt8(0, o + 3) // reserved
    buf.writeUInt16LE(1, o + 4) // planes
    buf.writeUInt16LE(32, o + 6) // bit count
    buf.writeUInt32LE(entry.png.length, o + 8)
    buf.writeUInt32LE(offsets[i], o + 12)
    entry.png.copy(buf, offsets[i])
  })
  return buf
}
