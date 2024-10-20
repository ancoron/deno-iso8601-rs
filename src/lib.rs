use deno_bindgen::deno_bindgen;
use iso8601_timestamp::{Duration as DurationISO, Timestamp};
use std::ffi::CString;
use std::slice;

const TIMESTAMP_STR_LEN: usize = 25;

fn from_millis(millis: u64) -> String {
  let duration = DurationISO::milliseconds(i64::try_from(millis).unwrap());
  Timestamp::UNIX_EPOCH.checked_add(duration).unwrap().to_string()
}

fn now() -> String {
  Timestamp::now_utc().to_string()
}

#[deno_bindgen]
pub fn iso_format_millis(millis: u64) -> String {
  from_millis(millis)
}

#[deno_bindgen]
pub fn iso_format_millis_fill(millis: u64, buf: &mut [u8]) {
  let ts = from_millis(millis);
  buf.copy_from_slice(ts.as_bytes());
}

unsafe fn write_cstr_into(ts: String, ptr: *mut u8) {
  let cstr = CString::new(ts).unwrap();
  let buf = slice::from_raw_parts_mut(ptr, TIMESTAMP_STR_LEN);
  buf.copy_from_slice(cstr.as_bytes_with_nul());
}

// shamelessly copied from here:
// https://github.com/denoland/deno/issues/19564#issuecomment-1610649690
#[no_mangle]
pub extern "C" fn free_c_string(ptr: *mut i8) {
  let bytes = unsafe { CString::from_raw(ptr) };
  drop(bytes);
}

// inspired from here:
// https://github.com/denoland/deno/issues/19564#issuecomment-1610649690
#[no_mangle]
pub extern "C" fn iso_format_millis_as_cstr(millis: u64) -> *mut i8 {
  let ts = from_millis(millis);
  CString::new(ts).unwrap().into_raw()
}

// inspired from here:
// https://stackoverflow.com/a/51321837
#[no_mangle]
pub unsafe extern fn iso_format_millis_fill_cstr(millis: u64, ptr: *mut u8) {
  let ts = from_millis(millis);
  write_cstr_into(ts, ptr);
}

#[deno_bindgen]
pub fn now_iso_format() -> String {
  now()
}

#[deno_bindgen]
pub fn now_iso_format_fill(buf: &mut [u8]) {
  let ts = now();
  buf.copy_from_slice(ts.as_bytes());
}

// inspired from here:
// https://github.com/denoland/deno/issues/19564#issuecomment-1610649690
#[no_mangle]
pub extern "C" fn now_iso_format_c() -> *mut i8 {
  let ts = now();
  CString::new(ts).unwrap().into_raw()
}

// inspired from here:
// https://stackoverflow.com/a/51321837
#[no_mangle]
pub unsafe extern fn now_iso_format_c_fill(ptr: *mut u8) {
  let ts = now();
  write_cstr_into(ts, ptr);
}
