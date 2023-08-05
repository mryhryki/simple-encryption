export declare function encrypt(
  args: SimpleEncryption.EncryptArgs,
): Promise<SimpleEncryption.EncryptedData>;

export declare function decrypt(
  args: SimpleEncryption.DecryptArgs,
): Promise<SimpleEncryption.DecryptedData>;

export namespace SimpleEncryption {
  type HexString = string;
  type SupportAlgorithm = "AES-GCM" | "AES-CBC";

  interface EncryptArgs {
    alg?: SupportAlgorithm | null;
    iv?: HexString | null;
    key: HexString;
    plainData: Uint8Array;
    crypto?: Crypto;
  }

  interface EncryptedData {
    alg: SupportAlgorithm;
    data: HexString;
    iv: HexString;
    crypto?: Crypto;
  }

  interface DecryptArgs extends EncryptedData {
    key: HexString;
  }

  interface DecryptedData {
    plainData: Uint8Array;
  }
}
