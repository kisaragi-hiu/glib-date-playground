# glib-date-playground

Working with GLib DateTime format strings is a little painful without a way to see what they resolve to.

So this project attempts to provide ways to play with GLib DateTime format strings.

- command: formatGLibDate
  - Install `bun` and `gjs`
    - Bun as the package manager and build time runtime; Node is not needed
    - gjs as the runtime for access to GLib
  - Go into ./formatGLibDate
  - `make build`
  - then run `gjs ./dist/formatGLibDate <format>`
    - `--help` is available
- planned browser frontend
  - The command alone is good enough for me now, but I kind of want a hosted frontend as well
  - The backend will run the command for each request (the command better be safe against user input)
  - The frontend can be a simple form
