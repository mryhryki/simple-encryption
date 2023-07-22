declare namespace SimpleEncryption {
  type HexString = string;
  type SupportAlgorithm = "AES-GCM" | "AES-CBC";

  interface EncryptedData {
    alg: SupportAlgorithm;
    data: HexString;
    iv: HexString;
  }

  interface DecryptArgs extends EncryptedData {
    key: HexString;
  }

  interface EncryptArgs {
    alg?: SupportAlgorithm | null;
    iv?: HexString | null;
    key: HexString;
    plainData: Uint8Array;
  }
}
