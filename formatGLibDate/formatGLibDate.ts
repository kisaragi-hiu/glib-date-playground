import { parseArgs } from "@pkgjs/parseargs";
// I want this to run on gjs 1.72.2, which complains if you feed imports into it.
// (The import above is bundled and doesn't reach the runtime.)
const GLib = imports.gi.GLib;

function main() {
  const parsedArgs = parseArgs({
    args: ARGV,
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      raw: { type: "boolean" },
    },
  });
  if (parsedArgs.values.help) {
    print(`formatGLibDate [format] ...

Format the current time according to the given formats.

If none is given, the default format is %FT%T%z.

Options:
  --help / -h: show help (this message)
  --raw:
    Output is normally in a form that's easy to read. Use this flag to only
    return the formatted dates.

GLib DateTime.format docs:
  https://docs.gtk.org/glib/method.DateTime.format.html`);
  } else {
    const raw = parsedArgs.values.raw;
    const date = GLib.DateTime.new_now_local();
    if (!raw) {
      print(`${date.format("%FT%T%z")}`);
    }
    for (const format of parsedArgs.positionals.length === 0
      ? ["%FT%T%z"]
      : parsedArgs.positionals) {
      if (raw) {
        print(date.format(format));
      } else {
        print(
          `${JSON.stringify(format)}: ${JSON.stringify(date.format(format))}`,
        );
      }
    }
  }
}

main();
