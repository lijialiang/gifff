import init, { parse, alloc, wasm_memory } from './pkg/gifff.js'

const fetchImage = (url: string): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onloadend = () => {
      if (request.response !== undefined && (request.status === 200 || request.status === 304)) {
        resolve(request.response)
      } else {
        reject(new Error(`XMLHttpRequest, ${request.statusText}`))
      }
    }
    request.send()
  })
}

const readImage = (file: File): Promise<ArrayBuffer> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer)
    }
    reader.readAsArrayBuffer(file)
  })
}

const parseGif = async (buf: ArrayBuffer): Promise<string> => {
  const size = buf.byteLength
  const ptr = alloc(size)
  const imgArray = new Uint8Array(wasm_memory().buffer, ptr, size)
  imgArray.set(new Uint8Array(buf))
  const base64 = await parse(ptr, size)
  return base64
}

/**
 * Get Gif First Frame
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
