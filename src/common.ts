export const DefaultAlg: Readonly<SimpleEncryption.SupportAlgorithm> =
  "AES-GCM" as const;

export const getRandomBytes = (length: number, crypto: Crypto): Uint8Array => {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#raw_import */
export const getKey = (
  key: Uint8Array,
  alg: string,
  crypto: Crypto,
): Promise<CryptoKey> =>
  crypto.subtle.importKey("raw", key, alg, true, [
    "encrypt",
    "decrypt",
  ]);
