export type EncryptFunc = (
  args: SimpleEncryption.EncryptArgs,
  crypto?: Crypto,
) => Promise<SimpleEncryption.EncryptedData>;

export type DecryptFunc = (
  args: SimpleEncryption.DecryptArgs,
  crypto?: Crypto,
) => Promise<SimpleEncryption.DecryptedData>;

export interface TestSubjects {
  encrypt: EncryptFunc;
  decrypt: DecryptFunc;
}

export interface Test {
  id: string;
  name: string;
  func: (testSubjects: TestSubjects) => Promise<void>;
}

export const assert = (v1: unknown, v2: unknown): void => {
  if (JSON.stringify(v1) !== JSON.stringify(v2)) {
    throw new Error(
      `Assertion failed: ${JSON.stringify(v1)} !== ${JSON.stringify(v2)}`,
    );
  }
};
