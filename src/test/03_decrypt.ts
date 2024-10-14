import { decrypt } from "../index.ts";
import type { SimpleEncryptionType } from "../types.d.ts";
import { assert, type Test } from "./common.ts";

const KEY = "b2880691b37d3e98417f59f6bbbc2704bc1f350e90f4c1c8d229a98e9086bac0";
const IV = "42b2ec4982b3e429f3d49159478c380f";
const PlainData = "f022bb62-d10a-480b-be8a-000584596690";

const EncryptedDataWithAesGcm: SimpleEncryptionType.DecryptArgs = {
  alg: "AES-GCM",
  data: "4fe66ad71d93c4b87f77fc8f234aa0f1a8a3abb78433438c3500832e83d2971f5c4f0b16d2b769cf7ef22bc120a3360ef0ad8025",
  key: KEY,
  iv: IV,
};

const EncryptedDataWithAesCbc: SimpleEncryptionType.DecryptArgs = {
  alg: "AES-CBC",
  data: "9cc48e3992dc10f6c7c19f9e95e8373ad0708b40ed6b867b0b6861775c0955a9aa2449edae5a4155e22cb8bbe1f94d0d",
  key: KEY,
  iv: IV,
};

export const test_03_1_DecryptWithAesGcm: Test = {
  id: "03-1",
  name: "Decrypt (AES-GCM)",
  func: () => dec(EncryptedDataWithAesGcm),
};

export const test_03_2_DecryptWithAesCbc: Test = {
  id: "03-2",
  name: "Decrypt (AES-CBC)",
  func: () => dec(EncryptedDataWithAesCbc),
};

const dec = async (
  decryptArgs: SimpleEncryptionType.DecryptArgs,
): Promise<void> => {
  const { plainData } = await decrypt(decryptArgs);
  assert(new TextDecoder().decode(plainData), PlainData);
};
