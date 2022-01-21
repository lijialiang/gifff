declare const _default: (file: string | File, options?: {
    wasm?: string | undefined;
} | undefined) => Promise<string>;
/**
 * Use `WebAssembly` to get Gif First Frame
 *
 * @param {string|File} file - GifHttpUrl or GifLocalFile
 * @param {undefined|Object} options
 * @param {undefined|string} options.wasm WASM File Url
 * @returns {Promise<string>} PNG base64
 */
export default _default;
