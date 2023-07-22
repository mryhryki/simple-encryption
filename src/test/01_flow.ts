import { decrypt, encrypt } from "../index.ts";
import { assert, Test } from "./common.ts";

const KEY = "314560f0574292fabeccc32a39de7f28";
const IV = "c3b21a40f02858c45853f369143d0b44";
const PlainData = "3b461ac2-05d1-406a-9214-d835e42c27cd";

export const test_01_1_FlowWithAesGcmWithIv: Test = {
  id: "01-1",
  name: "Flow (AES-GCM) with IV",
  func: () => flow("AES-GCM", IV),
};

export const test_01_2_FlowWithAesGcmWithoutIv: Test = {
  id: "01-2",
  name: "Flow (AES-GCM) without IV",
  func: () => flow("AES-GCM"),
};

export const test_01_3_FlowWithAesCbcWithIv: Test = {
  id: "01-3",
  name: "Flow (AES-CBC) with IV",
  func: () => flow("AES-CBC", IV),
};

export const test_01_4_FlowWithAesCbcWithoutIv: Test = {
  id: "01-4",
  name: "Flow (AES-CBC) without IV",
  func: () => flow("AES-CBC"),
};

const flow = async (alg: SimpleEncryption.SupportAlgorithm, iv?: string): Promise<void> => {
  const encryptResult = await encrypt({ alg, iv, key: KEY, plainData: new TextEncoder().encode(PlainData) });
  assert(encryptResult.alg, alg);
  if (iv != null) {
    assert(encryptResult.iv, iv);
  }

  const decryptResult = await decrypt({ ...encryptResult, key: KEY });
  assert(
    new TextDecoder().decode(decryptResult),
    PlainData
  );
};
