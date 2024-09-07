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
	gjs dist/playground.js
