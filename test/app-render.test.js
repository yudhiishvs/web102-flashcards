import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { build } from 'esbuild'

test('the app renders a card, guess form, and navigation', async () => {
  const result = await build({
    entryPoints: [new URL('../src/App.jsx', import.meta.url).pathname],
    bundle: true,
    packages: 'external',
    platform: 'node',
    format: 'cjs',
    write: false,
  })
  const compiled = { exports: {} }
  const require = createRequire(import.meta.url)
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, compiled, compiled.exports)

  const html = renderToString(createElement(compiled.exports.default))
  assert.match(html, /Web Development/)
  assert.match(html, /Your guess/)
  assert.match(html, /PREVIOUS/)
  assert.match(html, /NEXT/)
})
