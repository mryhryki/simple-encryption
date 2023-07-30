export declare function encrypt(
  args: SimpleEncryption.EncryptArgs,
  crypto?: Crypto,
): Promise<SimpleEncryption.EncryptedData>;

export declare function decrypt(
  args: SimpleEncryption.DecryptArgs,
  crypto?: Crypto,
): Promise<SimpleEncryption.DecryptedData>;

declare namespace SimpleEncryption {
  type HexString = string;
  type SupportAlgorithm = "AES-GCM" | "AES-CBC";

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

  interface DecryptArgs extends EncryptedData {
    key: HexString;
  }

  interface DecryptedData {
    plainData: Uint8Array;
  }
}
