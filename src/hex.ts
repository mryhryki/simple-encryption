const HexCharacters = "0123456789abcdef";

const toBin = (hex: string): Uint8Array => {
  if (typeof hex !== "string") {
    throw new Error('"hex" value is not string');
  }
  if (hex.length % 2 !== 0) {
    throw new Error(
      `"hex" value length must be a multiple of 2: ${hex} (Length: ${hex.length})`,
    );
  }
  const matches = hex.match(new RegExp(`[^${HexCharacters}]`, "g"));
  if (matches != null) {
    throw new Error(`Invalid hex characters: ${matches.join(",")}`);
  }

  const results: number[] = [];
  for (let p = 0; p < hex.length; p += 2) {
    results.push(parseInt(hex.substring(p, p + 2), HexCharacters.length));
  }
  return new Uint8Array(results);
};

const fromBin = (bin: Uint8Array): string => {
  if (!(bin instanceof Uint8Array)) {
    throw new Error('"bin" is not Uint8Array');
  }
  return Array.from(bin)
    .map((n: number): string =>
      [
        HexCharacters.at(Math.floor(n / HexCharacters.length)), //
        HexCharacters.at(n % HexCharacters.length),
      ].join("")
    )
    .join("");
};

export const Hex = { toBin, fromBin };
