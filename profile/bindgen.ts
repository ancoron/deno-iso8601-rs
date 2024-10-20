import * as lib from "../mod.ts";

const millis = Date.now();

for (let i = 0; i < 1000000; i++) {
  lib.iso_format_millis(millis);
}
