DENO_DEBUG_BIN ?= deno-profile
DENO_RUN_OPTS = --allow-ffi --allow-env

BUILD_PROFILE ?= debug
export BUILD_PROFILE

BUILD_TYPE ?= flamegraph

SCRIPTS = *.ts

.PHONY: $(SCRIPTS)

$(SCRIPTS):
ifeq ($(BUILD_TYPE), flamegraph)
	flamegraph --freq 2500 --no-inline -o $(shell basename "$@" .ts).svg -- \
		$(DENO_DEBUG_BIN) run $(DENO_RUN_OPTS) "$@"
else
	/usr/bin/time -v deno run $(DENO_RUN_OPTS) "$@"
endif
