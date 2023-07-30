import { decrypt } from "../index.ts";
import { assert, Test } from "./common.ts";

const KEY = "b2880691b37d3e98417f59f6bbbc2704bc1f350e90f4c1c8d229a98e9086bac0";
const IV = "b2880691b37d3e98417f59f6bbbc2704bc1f350e90f4c1c8d229a98e9086bac0";
const PlainData = "f022bb62-d10a-480b-be8a-000584596690";

const EncryptedDataWithAesGcm: SimpleEncryption.DecryptArgs = {
  alg: "AES-GCM",
  data:
    "0948b1d11894bd7ce4f165aa1b70cd0c74b54565c448b874040e5fe738f03915f1394735cf90ac3222e7fc262720f570812cd6c2",
  key: KEY,
  iv: IV,
};

const EncryptedDataWithAesCbc: SimpleEncryption.DecryptArgs = {
  alg: "AES-CBC",
  data:
    "387cc155ad920b4d435cbc6d4211223b2873c2cef68fb61dbbf0064ee08484b41f039feb7bc8f53e2a87525d175fa563",
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
  decryptArgs: SimpleEncryption.DecryptArgs,
): Promise<void> => {
  const decryptResult = await decrypt(decryptArgs);
  assert(decryptResult, new TextEncoder().encode(PlainData));
};
