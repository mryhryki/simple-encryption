import { encrypt } from "../index.ts";
import { assert, Test } from "./common.ts";

const KEY = "b2880691b37d3e98417f59f6bbbc2704bc1f350e90f4c1c8d229a98e9086bac0";
const IV = "0e506606bf986f11f8582a736078725c";
const PlainData = "e8476638-38e4-47a8-9236-bf53d55aae13";

const EncryptedDataWithAesGcm: SimpleEncryption.EncryptedData = {
  alg: "AES-GCM",
  data:
    "556dccee7f7f72233db6812db8b5472b74e15e6738541c3bd9a605e10a9231f05ba299545acfa9ae479e36290c34410fb6d21cea",
  iv: IV,
};

const EncryptedDataWithAesCbc: SimpleEncryption.EncryptedData = {
  alg: "AES-CBC",
  data:
    "865810ce318512a9e5b6eb3de96603a268581aceddf26db3139af27b15a110b6d8d21d8dca187284c8277b3dfca38f98",
  iv: IV,
};

export const test_02_1_EncryptWithAesGcm: Test = {
  id: "02-1",
  name: "Encrypto (AES-GCM)",
  func: () => enc("AES-GCM", EncryptedDataWithAesGcm),
};

export const test_02_2_EncryptWithAesCbc: Test = {
  id: "02-2",
  name: "Encrypto (AES-CBC)",
  func: () => enc("AES-CBC", EncryptedDataWithAesCbc),
};

const enc = async (
  alg: SimpleEncryption.SupportAlgorithm,
  expectData: SimpleEncryption.EncryptedData,
): Promise<void> => {
  const encryptResult = await encrypt({
    alg,
    iv: IV,
    key: KEY,
    plainData: new TextEncoder().encode(PlainData),
  });
  assert(encryptResult, expectData);
};
