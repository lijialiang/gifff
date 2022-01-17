extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::mem;
use js_sys::{Error};
use image::{ImageFormat,ImageOutputFormat};

#[wasm_bindgen]
extern {
  #[wasm_bindgen(js_namespace = console)]
  pub fn log(s: &str);
}

// #[wasm_bindgen]
// pub async fn parse(url: String) -> Result<JsValue, JsValue> {
//   let client = reqwest::Client::new();
//   let res = match client.get(url).send().await {
//     Ok(res) => res,
//     Err(err) => return Err(JsValue::from(Error::new(&format!("{:?}", err)))),
//   };
//   let bytes = match res.bytes().await {
//     Ok(bytes) => bytes,
//     Err(err) => return Err(JsValue::from(Error::new(&format!("{:?}", err)))),
//   };
//   let image = match image::load_from_memory_with_format(&bytes, ImageFormat::Gif) {
//     Ok(image) => image,
//     Err(err) => return Err(JsValue::from(Error::new(&format!("{:?}", err)))),
//   };
//   let mut u8: Vec<u8> = Vec::new();
//   image.write_to(&mut u8, ImageOutputFormat::Png);
//   let base64 = base64::encode(u8);
//   Ok(JsValue::from_str(base64.as_str()))
// }

#[wasm_bindgen]
pub fn wasm_memory() -> JsValue {
  wasm_bindgen::memory()
}

#[wasm_bindgen]
pub fn alloc(size: usize) -> *mut u8 {
  let mut buf = Vec::with_capacity(size);
  let ptr = buf.as_mut_ptr();
  mem::forget(buf);
  ptr
}

#[wasm_bindgen]
pub async fn parse(ptr: *mut u8, size: usize) -> Result<JsValue, JsValue> {
  let bytes = unsafe { Vec::from_raw_parts(ptr, size, size) };
  let image = match image::load_from_memory_with_format(&bytes, ImageFormat::Gif) {
    Ok(image) => image,
    Err(err) => return Err(JsValue::from(Error::new(&format!("{:?}", err)))),
  };
  let mut u8: Vec<u8> = Vec::new();
  image.write_to(&mut u8, ImageOutputFormat::Png);
  let base64 = format!("{},{}", "data:image/png;base64", base64::encode(u8));
  Ok(JsValue::from_str(base64.as_str()))
}
