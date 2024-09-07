# Thanks https://stackoverflow.com/a/14061796
# If the first argument is "run"...
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

dist/formatGLibDate.js: formatGLibDate.ts
	@npx esbuild formatGLibDate.ts \
		--outdir=dist \
		--bundle \
		--target=firefox91 \
		--format=cjs \
		--external:"gi://*" \
		--external:"resource://*" \
		--external:gettext \
		--external:system \
		--external:cairo

run: dist/formatGLibDate.js
	gjs dist/formatGLibDate.js $(RUN_ARGS)

build: dist/formatGLibDate.js
