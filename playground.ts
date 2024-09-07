import { parseArgs } from "@pkgjs/parseargs";
// I want this to run on gjs 1.72.2, which complains if you feed imports into it.
// (The import above is bundled and doesn't reach the runtime.)
const GLib = imports.gi.GLib;

function main() {
  const parsedArgs = parseArgs({
    args: ARGV,
    options: {
      format: { type: "string" },
    },
  });
  const date = GLib.DateTime.new_now_local();

  const format = parsedArgs.values.format ?? "%FT%T%z";
  print(date.format(format));
}

main();
