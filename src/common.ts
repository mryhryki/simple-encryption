import { convHexToBin } from "./hex.ts";

export const DefaultAlg: Readonly<SimpleEncryption.SupportAlgorithm> =
  "AES-GCM" as const;

export const getRandomBytes = (length: number, crypto: Crypto): Uint8Array => {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
};

export const toUint8Array = (
  val: string | Uint8Array | ArrayBuffer,
): Uint8Array => {
  if (val instanceof ArrayBuffer) {
    return new Uint8Array(val);
  } else if (val instanceof Uint8Array) {
    return val;
  }
  return new TextEncoder().encode(val);
};

export const getKey = (key: Uint8Array, alg: string): Promise<CryptoKey> =>
  crypto.subtle.importKey("raw", key, alg, true, [
    "encrypt",
    "decrypt",
  ]);
