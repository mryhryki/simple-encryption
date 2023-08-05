import { bundle } from "https://deno.land/x/emit/mod.ts";

const { code } = await bundle("./src/index.ts");
await Deno.mkdir("./dist/", { recursive: true });
await Deno.writeTextFile("./dist/index.js", code);
