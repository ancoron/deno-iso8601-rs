import { now_iso_format_fill } from "../mod.ts";

for (let i = 0; i < 1000000; i++) {
  const ts = now_iso_format_fill();
}
