import { bundle } from "https://deno.land/x/emit/mod.ts";

const { code } = await bundle("./src/index.ts");
await Deno.writeTextFile("./src/index.js", code);
