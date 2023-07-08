import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { convBinToHex, convHexToBin } from "./hex.ts";

const Array256 = Array.from({ length: 256 }).map((_, i) => i);
const HexBin = new Uint8Array(Array256);
const HexText = Array256.map((i) => Number(i).toString(16).padStart(2, "0"))
  .join("");

Deno.test("convHexToBin", () => {
  assertEquals(HexBin.toString(), convHexToBin(HexText).toString());
});

Deno.test("convBinToHex", () => {
  assertEquals(HexText, convBinToHex(HexBin));
});
