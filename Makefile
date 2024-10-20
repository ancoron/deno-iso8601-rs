BUILD_PROFILE = release
export BUILD_PROFILE

DENO_RUN_OPTS = --allow-ffi --allow-env

.PHONY: test bench

generate-bindings:
	deno_bindgen

build:
ifeq ($(BUILD_PROFILE), debug)
	cargo build
else
ifeq ($(BUILD_PROFILE), release)
	cargo build --release
else
	cargo build --profile $(BUILD_PROFILE)
endif
endif

test: build
	deno test $(DENO_RUN_OPTS) mod_test.ts

bench: build
	deno bench $(DENO_RUN_OPTS) bench.ts
