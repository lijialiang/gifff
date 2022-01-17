import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'
import typescript from 'rollup-plugin-typescript2'

const FORMAT = process.env.FORMAT
const IS_TEST_ENV = process.env.NODE_ENV === 'test'
const DIST_FILE_NAME = 'index'
const TEST_DIR = '__test__'
const DIST_DIR = 'dist'
const UMD_NAME = 'Gifff'

const config = {
  input: 'index.ts',
  output: {
    file: IS_TEST_ENV ? `${TEST_DIR}/${DIST_FILE_NAME}.js` : `${DIST_DIR}/${DIST_FILE_NAME}.min.js`,
    format: 'umd',
    name: UMD_NAME,
    sourcemap: false
  },
  plugins: [
    typescript({
      tsconfig: IS_TEST_ENV ? 'tsconfig.test.json' : 'tsconfig.json'
    }),
    IS_TEST_ENV && serve(TEST_DIR),
    IS_TEST_ENV && livereload({
      watch: TEST_DIR,
      verbose: false
    }),
    !IS_TEST_ENV && terser(),
    !IS_TEST_ENV && banner('v<%= pkg.version %>')
  ]
}

export default config
