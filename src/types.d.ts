export declare function encrypt(
  args: SimpleEncryption.EncryptArgs,
  crypto?: Crypto,
): Promise<SimpleEncryption.EncryptedData>;

export declare function decrypt(
  args: SimpleEncryption.DecryptArgs,
  crypto?: Crypto,
): Promise<SimpleEncryption.DecryptedData>;

export namespace SimpleEncryption {
  type HexString = string;
  type SupportAlgorithm = "AES-GCM" | "AES-CBC";

  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface EncryptArgs {
    alg?: SupportAlgorithm | null;
    iv?: HexString | null;
    key: HexString;
    plainData: Uint8Array;
  }

  interface EncryptedData {
    alg: SupportAlgorithm;
    data: HexString;
    iv: HexString;
  }

  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DecryptArgs extends EncryptedData {
    key: HexString;
  }

  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DecryptedData {
    plainData: Uint8Array;
  }
}
