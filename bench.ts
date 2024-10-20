import * as lib from "./mod.ts";

const millis = Date.now();

Deno.bench(
  "standard JavaScript (new Date(millis))",
  { group: "From Milliseconds", baseline: true },
  () => {
    new Date(millis).toISOString();
  },
);

Deno.bench(
  "FFI (bindgen; return String)",
  { group: "From Milliseconds" },
  () => {
    lib.iso_format_millis(millis);
  },
);

Deno.bench(
  "FFI (bindgen; pass a buffer)",
  { group: "From Milliseconds" },
  () => {
    lib.iso_format_millis_fill(millis);
  },
);

Deno.bench(
  "FFI (manual; return CString + free)",
  { group: "From Milliseconds" },
  () => {
    lib.iso_format_millis_as_cstr(millis);
  },
);

Deno.bench(
  "FFI (manual; fill buffer with CString)",
  { group: "From Milliseconds" },
  () => {
    lib.iso_format_millis_fill_cstr(millis);
  },
);

Deno.bench(
  "standard JavaScript (new Date())",
  { group: "Current Timestamp", baseline: true },
  () => {
    new Date().toISOString();
  },
);

Deno.bench(
  "FFI (bindgen; return String)",
  { group: "Current Timestamp" },
  () => {
    lib.now_iso_format();
  },
);

Deno.bench(
  "FFI (bindgen; pass a buffer)",
  { group: "Current Timestamp" },
  () => {
    lib.now_iso_format_fill();
  },
);

Deno.bench(
  "FFI (manual; return CString + free)",
  { group: "Current Timestamp" },
  () => {
    lib.now_iso_format_c();
  },
);

Deno.bench(
  "FFI (manual; fill buffer with CString)",
  { group: "Current Timestamp" },
  () => {
    lib.now_iso_format_c_fill();
  },
);
