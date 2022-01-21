import { fetchImage, readImage } from './utils'


const parseGif = async (buf: ArrayBuffer): Promise<Blob> => {
  const image = new Image()
  await new Promise((resolve) => {
    image.src = URL.createObjectURL(new Blob([buf]))
      image.onload = resolve
  })
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error('Canvas Context null')
  ctx.drawImage(image, 0, 0, image.width, image.height)
  return await new Promise((resolve, reject) => canvas.toBlob((blob) => {
    if (blob === null) {
      reject('Canvas Blob null')
    } else {
      resolve(blob)
    }
  }))
}

/**
 * Use `HTMLCanvasElement` to get Gif First Frame
 *
 * @param {string|File} file - GifHttpUrl or GifLocalFile
 * @returns {Promise<Blob>} PNG Blob
 */
 export default async (file: string | File): Promise<Blob> => {
  if (typeof file === 'string') {
    return await parseGif(await fetchImage(file))
  }
  return await parseGif(await readImage(file))
}

