# Thanks https://stackoverflow.com/a/14061796
# If the first argument is "run"...
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

dist/playground.js: playground.ts
	@npx esbuild playground.ts \
		--outdir=dist \
		--bundle \
		--target=firefox91 \
		--format=cjs \
		--external:"gi://*" \
		--external:"resource://*" \
		--external:gettext \
		--external:system \
		--external:cairo

run: dist/playground.js
	gjs dist/playground.js $(RUN_ARGS)
