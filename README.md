# Gif First Frame ![](https://img.shields.io/npm/v/gifff?style=flat-square) ![](https://img.shields.io/npm/l/gifff?style=flat-square)

Get the first frame of a Gif image.

## Install

```sh
# yarn
yarn add gifff
# npm
npm install gifff
```

## Usage

### HTMLCanvasElement

```ts
import gifff from 'gifff/canvas'

/**
 * Use `HTMLCanvasElement` to get Gif First Frame
 *
 * @param {string|File} file - GifHttpUrl or GifLocalFile
 * @returns {Promise<Blob>} PNG Blob
 */
const blob = await gifff(Gif)
document.getElementById('img').src = URL.createObjectURL(blob)
```

[Playground](https://jsbin.com/mowejon)

### WebAssembly

```ts
import gifff from 'gifff/wasm'

/**
 * Get Gif First Frame
 *
 * @param {string|File} file - GifHttpUrl or GifLocalFile
 * @param {undefined|Object} options
 * @param {undefined|string} options.wasm WASM File Url
 * @returns {Promise<string>} PNG base64
 */
const base64 = await gifff(Gif, {
  wasm: WASM_PATH
})
document.getElementById('img').src = base64
```

[Playground](https://jsbin.com/segunap)

## LICENSE

[MIT](LICENSE)
