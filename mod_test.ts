import { assertEquals, assertMatch } from "@std/assert";
import * as lib from "./mod.ts";

const ISO_MILLIS_REGEX = /^[1-9][0-9]*-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?Z?$/;

Deno.test("iso_format_millis", () => {
  // given
  const millis = Date.now();
  const expected = new Date(millis).toISOString();

  // when
  const actual = lib.iso_format_millis(millis);

  // then
  assertEquals(actual, expected);
});

Deno.test("iso_format_millis_fill", () => {
  // given
  const millis = Date.now();
  const expected = new Date(millis).toISOString();

  // when
  const actual = lib.iso_format_millis_fill(millis);

  // then
  assertEquals(actual, expected);
});

Deno.test("iso_format_millis_as_cstr", () => {
  // given
  const millis = Date.now();
  const expected = new Date(millis).toISOString();

  // when
  const actual = lib.iso_format_millis_as_cstr(millis);

  // then
  assertEquals(actual, expected);
});

Deno.test("iso_format_millis_fill_cstr", () => {
  // given
  const millis = Date.now();
  const expected = new Date(millis).toISOString();

  // when
  const actual = lib.iso_format_millis_fill_cstr(millis);

  // then
  assertEquals(actual, expected);
});

Deno.test("now_iso_format", () => {
  // when
  const actual = lib.now_iso_format();

  // then
  assertMatch(actual, ISO_MILLIS_REGEX);
});

Deno.test("now_iso_format_fill", () => {
  // when
  const actual = lib.now_iso_format_fill();

  // then
  assertMatch(actual, ISO_MILLIS_REGEX);
});

Deno.test("now_iso_format_c", () => {
  // when
  const actual = lib.now_iso_format_c();

  // then
  assertMatch(actual, ISO_MILLIS_REGEX);
});

Deno.test("now_iso_format_c_fill", () => {
  // when
  const actual = lib.now_iso_format_c_fill();

  // then
  assertMatch(actual, ISO_MILLIS_REGEX);
});
