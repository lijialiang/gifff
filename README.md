# Gif First Frame

Use `wasm` to capture the first frame of a Gif image.

[DEMO](https://stackblitz.com/edit/gif-first-frame?file=index.html)

## Install

```sh
# yarn
yarn add gifff
# npm
npm install gifff
```

## Usage

```ts
import gifff from 'gifff'

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
```

## LICENSE

[MIT](LICENSE)
