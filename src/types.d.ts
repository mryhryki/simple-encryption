export declare function encrypt(
  args: SimpleEncryptionType.EncryptArgs,
): Promise<SimpleEncryptionType.EncryptedData>;

export declare function decrypt(
  args: SimpleEncryptionType.DecryptArgs,
): Promise<SimpleEncryptionType.DecryptedData>;

export namespace SimpleEncryptionType {
  type HexString = string;
  type SupportAlgorithm = "AES-GCM" | "AES-CBC";

  interface EncryptArgs {
    alg?: SupportAlgorithm | null;
    iv?: HexString | null;
    key: HexString;
    plainData: Uint8Array;
    // TODO: Remove after EOL Node.js v18 (2025-05-01~)
    crypto?: Crypto;
  }

  interface EncryptedData {
    alg: SupportAlgorithm;
    data: HexString;
    iv: HexString;
    // TODO: Remove after EOL Node.js v18 (2025-05-01~)
    crypto?: Crypto;
  }

  interface DecryptArgs extends EncryptedData {
    key: HexString;
  }

  interface DecryptedData {
    plainData: Uint8Array;
  }
}
