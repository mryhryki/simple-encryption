import { SimpleEncryptionType } from "../types.d.ts";

export type EncryptFunc = (
  args: SimpleEncryptionType.EncryptArgs,
  crypto?: Crypto,
) => Promise<SimpleEncryptionType.EncryptedData>;

export type DecryptFunc = (
  args: SimpleEncryptionType.DecryptArgs,
  crypto?: Crypto,
) => Promise<SimpleEncryptionType.DecryptedData>;

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
