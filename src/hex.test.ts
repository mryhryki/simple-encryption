import { assert, describe, expect, it } from "vitest";
import { Hex } from "./hex.ts";

const Array256 = Array.from({ length: 256 }).map((_, i) => i);
const HexBin = new Uint8Array(Array256);
const HexText = Array256.map((i) =>
  Number(i).toString(16).padStart(2, "0"),
).join("");

describe("Hex", async () => {
  it("Hex.toBin(ValidText)", () => {
    expect(HexBin.toString()).toBe(Hex.toBin(HexText).toString());
  });

  it("Hex.toBin(EmptyText)", () => {
    expect("", Hex.toBin("").toString());
  });

  it("Hex.toBin(InvalidText)", () => {
    try {
      Hex.toBin("abC12z");
      assert.fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe("Invalid hex characters: C,z");
    }
  });

  it("Hex.toBin(InvalidLength)", () => {
    try {
      Hex.toBin("abcde");
      assert.fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(
        '"hex" value length must be a multiple of 2: abcde (Length: 5)',
      );
    }
  });

  it("Hex.toBin(Not string)", () => {
    try {
      // biome-ignore lint/suspicious/noExplicitAny: for testing
      Hex.toBin(1234 as any);
      assert.fail("Hex.toBin() is not thrown Error");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe('"hex" value is not string');
    }
  });

  it("Hex.fromBin(ValidBin)", () => {
    expect(HexText).toBe(Hex.fromBin(HexBin));
  });

  it("Hex.fromBin(Not Uint8Array)", () => {
    expect(HexText).toEqual(Hex.fromBin(HexBin));
    try {
      // biome-ignore lint/suspicious/noExplicitAny: for testing
      Hex.fromBin(new Int8Array(4) as any);
      assert.fail("Hex.fromBin() is not thrown Error");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe('"bin" is not Uint8Array');
    }
  });
});
