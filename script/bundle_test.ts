import { bundle } from "https://deno.land/x/emit/mod.ts";

const { code } = await bundle("./src/test/index.ts");
await Deno.writeTextFile("./src/test/index.js", code);
