import ShopifyStacktraceyPlugin from '../../../bin/bundling/esbuild-plugin-stacktracey.js'
import {build as esBuild} from 'esbuild'
import glob from 'fast-glob'
import {copy} from 'esbuild-plugin-copy'

const external = [
  // react-devtools-core is a dev dependency, no need to bundle it but throws errors if not included here.
  'react-devtools-core',
]

// yoga wasm file is not bundled by esbuild, so we need to copy it manually
const yogafile = glob.sync('../../node_modules/.pnpm/**/yoga.wasm')[0]

esBuild({
  bundle: true,
  entryPoints: ['./src/**/*.ts'],
  outdir: './dist',
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  inject: ['../../bin/bundling/cjs-shims.js'],
  external,
  loader: {'.node': 'copy'},
  splitting: true,
  // these tree shaking and minify options remove any in-source tests from the bundle
  treeShaking: true,
  minifyWhitespace: false,
  minifySyntax: true,
  minifyIdentifiers: false,

  plugins: [
    ShopifyStacktraceyPlugin,
    copy({
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      resolveFrom: 'cwd',
      assets: [
        {
          from: [yogafile],
          to: ['./dist/'],
        },
      ],
    }),
  ],
  define: {
    'import.meta.vitest': 'false',
  },
})
