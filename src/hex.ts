const HexCharacters = "0123456789abcdef";

export const convHexToBin = (hex: string): Uint8Array => {
  const results: number[] = [];
  if (hex.length % 2 !== 0) {
    throw new Error('"hex" value length must be a multiple of 2');
  }
  for (let p = 0; p < hex.length; p += 2) {
    const num = parseInt(hex.substring(p, p + 2), HexCharacters.length);
    if (isNaN(num)) {
      throw new Error(
        `Invalid hex characters: [${hex.substring(p, p + 2)}] at ${p}`,
      );
    }
    results.push(num);
  }
  return new Uint8Array(results);
};

export const convBinToHex = (bin: Uint8Array): string =>
  Array.from(bin)
    .map((n: number): string =>
      [
        HexCharacters.at(Math.floor(n / HexCharacters.length)), //
        HexCharacters.at(n % HexCharacters.length),
      ].join("")
    )
    .join("");
