/**
 * Format the current time with GLib using `format`.
 * Returns a ReadableStream. Use (new Response(stream)).text() to get a
 * promise for the entire output.
 */
function formatNow(format: string) {
  const proc = Bun.spawn([
    "gjs",
    "../formatGLibDate/dist/formatGLibDate.js",
    "--raw",
    format,
  ]);
  return proc.stdout;
}

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    if (path === "/") {
      return new Response("/<format string>");
    }
    return new Response(formatNow(path.substring(1)));
  },
});

console.log(`Server started on ${server.url}`);
