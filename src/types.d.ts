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
