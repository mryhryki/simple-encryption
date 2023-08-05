import { encrypt } from "../index.ts";
import { SimpleEncryptionType } from "../types.d.ts";
import { assert, Test } from "./common.ts";

const KEY = "b2880691b37d3e98417f59f6bbbc2704bc1f350e90f4c1c8d229a98e9086bac0";
const IV = "0e506606bf986f11f8582a736078725c";
const PlainData = "e8476638-38e4-47a8-9236-bf53d55aae13";

const EncryptedDataWithAesGcm: SimpleEncryptionType.EncryptedData = {
  alg: "AES-GCM",
  data:
    "c2210c34ebc5259b2843409c74735ac59a1e2caf5940e83a0f6ca7d35d3711e18876eaf3bf997f8ad98638028b7e33bef6099da2",
  iv: IV,
};

const EncryptedDataWithAesCbc: SimpleEncryptionType.EncryptedData = {
  alg: "AES-CBC",
  data:
    "7bc4f92b6e0633f084023e4a1ead3c7cc95ec9d79fe34fe536e5c5c4d24c50eeecc34966a705157f2237fe202ddf6a70",
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
  alg: SimpleEncryptionType.SupportAlgorithm,
  expectData: SimpleEncryptionType.EncryptedData,
): Promise<void> => {
  const encryptResult = await encrypt({
    alg,
    iv: IV,
    key: KEY,
    plainData: new TextEncoder().encode(PlainData),
  });
  assert(encryptResult, expectData);
};
