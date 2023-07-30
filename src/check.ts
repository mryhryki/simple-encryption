export const checkIvLength = (iv: Uint8Array): Uint8Array => {
  if (iv.length === 16) {
    return iv;
  }
  throw new Error(`IV length must be 16 bytes: Actual => ${iv.length}`);
};
