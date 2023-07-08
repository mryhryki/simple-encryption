declare namespace SimpleEncryption {
  type SupportAlgorithm = "AES-CTR" | "AES-CBC" | "AES-GCM" | "AES-KW";

  interface EncryptedData {
    alg: SupportAlgorithm;
    data: string;
    iv: string;
  }

  interface DecryptArgs extends EncryptedData {
    key: string | Uint8Array | ArrayBuffer;
  }

  interface EncryptArgs {
    alg?: SupportAlgorithm | null;
    iv?: string | Uint8Array | ArrayBuffer | null;
    key: string | Uint8Array | ArrayBuffer;
    plainData: string | Uint8Array | ArrayBuffer;
  }
}
