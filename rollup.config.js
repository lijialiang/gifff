import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'
import typescript from 'rollup-plugin-typescript2'
import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const FORMAT = process.env.FORMAT
const IS_TEST_ENV = process.env.NODE_ENV === 'test'
const DIST_FILE_NAME = 'index'
const TEST_DIR = '__test__'
const DIST_DIR = './'
const UMD_NAME = 'Gifff'

const plugins = [
  resolve({ jsnext: true, preferBuiltins: true, browser: true }),
  commonjs(),
  typescript({
    tsconfig: IS_TEST_ENV ? 'tsconfig.test.json' : 'tsconfig.json'
  }),
  babel({
    exclude: /node_modules/,
    babelrc: false,
    babelHelpers: 'runtime',
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        { targets: '> 0.25%, not dead' }
      ]
    ]
  }),
  IS_TEST_ENV && serve(TEST_DIR),
  IS_TEST_ENV && livereload({
    watch: TEST_DIR,
    verbose: false
  }),
  !IS_TEST_ENV && terser({
    output: {
      comments: false
    }
  }),
  !IS_TEST_ENV && banner('https://github.com/lijialiang/gifff v<%= pkg.version %>')
]

const config = [
  {
    input: './src/wasm.ts',
    output: {
      file: IS_TEST_ENV ? `${TEST_DIR}/wasm.js` : `${DIST_DIR}/wasm.js`,
      format: 'umd',
      name: UMD_NAME,
      sourcemap: false
    },
    plugins
  },
  {
    input: './src/canvas.ts',
    output: {
      file: IS_TEST_ENV ? `${TEST_DIR}/canvas.js` : `${DIST_DIR}/canvas.js`,
      format: 'umd',
      name: UMD_NAME,
      sourcemap: false
    },
    plugins
  }
]

export default config
