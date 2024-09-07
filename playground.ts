const GLib = imports.gi.GLib;

const date = GLib.DateTime.new_now_local();

print(date.format("%FT%T%z"));
