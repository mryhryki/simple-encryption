import {
  assert,
  assertEquals,
  fail,
} from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { Hex } from "./hex.ts";

const Array256 = Array.from({ length: 256 }).map((_, i) => i);
const HexBin = new Uint8Array(Array256);
const HexText = Array256.map((i) => Number(i).toString(16).padStart(2, "0"))
  .join("");

Deno.test("Hex", async (t) => {
  await t.step("Hex.toBin(ValidText)", () => {
    assertEquals(HexBin.toString(), Hex.toBin(HexText).toString());
  });

  await t.step("Hex.toBin(EmptyText)", () => {
    assertEquals("", Hex.toBin("").toString());
  });

  await t.step("Hex.toBin(InvalidText)", () => {
    try {
      Hex.toBin("abC12z");
      fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      assert(err instanceof Error);
      assertEquals(err.message, "Invalid hex characters: C,z");
    }
  });

  await t.step("Hex.toBin(InvalidLength)", () => {
    try {
      Hex.toBin("abcde");
      fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      assert(err instanceof Error);
      assertEquals(
        err.message,
        '"hex" value length must be a multiple of 2: abcde (Length: 5)',
      );
    }
  });

  await t.step("Hex.toBin(Not string)", () => {
    try {
      Hex.toBin(1234 as any);
      fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      assert(err instanceof Error);
      assertEquals(err.message, '"hex" value is not string');
    }
  });

  await t.step("Hex.fromBin(ValidBin)", () => {
    assertEquals(HexText, Hex.fromBin(HexBin));
  });

  await t.step("Hex.fromBin(Not Uint8Array)", () => {
    assertEquals(HexText, Hex.fromBin(HexBin));
    try {
      Hex.fromBin(new Int8Array(4) as any);
      fail("Hex.fromBin() is not thrown Error");
    } catch (err) {
      assert(err instanceof Error);
      assertEquals(err.message, '"bin" is not Uint8Array');
    }
  });
});
