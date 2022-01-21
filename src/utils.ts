export const fetchImage = (url: string): Promise<ArrayBuffer> => {
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

export const readImage = (file: File): Promise<ArrayBuffer> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer)
    }
    reader.readAsArrayBuffer(file)
  })
}
