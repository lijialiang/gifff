import init, { parse, alloc, wasm_memory } from '../pkg/gifff.js'
import { fetchImage, readImage } from './utils'

const parseGif = async (buf: ArrayBuffer): Promise<string> => {
  const size = buf.byteLength
  const ptr = alloc(size)
  const imgArray = new Uint8Array(wasm_memory().buffer, ptr, size)
  imgArray.set(new Uint8Array(buf))
  const base64 = await parse(ptr, size)
  return base64
}

/**
 * Use `WebAssembly` to get Gif First Frame
 *
 * @param {string|File} file - GifHttpUrl or GifLocalFile
 * @param {undefined|Object} options
 * @param {undefined|string} options.wasm WASM File Url
 * @returns {Promise<string>} PNG base64
 */
export default async (file: string | File, options?: {
  wasm?: string
}): Promise<string> => {
  await init(options?.wasm)
  if (typeof file === 'string') {
    return await parseGif(await fetchImage(file))
  }
  return await parseGif(await readImage(file))
}
