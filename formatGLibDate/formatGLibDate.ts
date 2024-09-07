import { parseArgs } from "@pkgjs/parseargs";
import type { default as GLibModule } from "@girs/glib-2.0";
// I want this to run on gjs 1.72.2, which complains if you feed imports into it.
// (The import above is bundled and doesn't reach the runtime.)
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

function formatDate(date: GLibModule.DateTime, format: string, raw?: boolean) {
  // We still need a JSON string for `raw` to handle when the output is null.
  return raw
    ? JSON.stringify(date.format(format))
    : `${JSON.stringify(format)}: ${JSON.stringify(date.format(format))}`;
}

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

If none is given, an interactive session is started.

Options:
  --help / -h: show help (this message)
  --raw:
    Output is normally in a form that's easy to read. Use this flag to only
    return the formatted dates. (The value is still a JSON string.)

GLib DateTime.format docs:
  https://docs.gtk.org/glib/method.DateTime.format.html`);
  } else {
    const raw = parsedArgs.values.raw;
    if (parsedArgs.positionals.length === 0) {
      const stdin = new Gio.DataInputStream({
        base_stream: new Gio.UnixInputStream({ fd: 0 }),
        close_base_stream: true,
      });
      while (true) {
        const date = GLib.DateTime.new_now_local();
        print("Enter format below:");
        const [format] = stdin.read_line_utf8(null);
        if (typeof format !== "string") break;
        print(formatDate(date, format, false));
      }
    } else {
      const date = GLib.DateTime.new_now_local();
      if (!raw) {
        print(`${date.format("%FT%T%z")}`);
      }
      for (const format of parsedArgs.positionals) {
        print(formatDate(date, format, parsedArgs.values.raw));
      }
    }
  }
}

main();
