import type { SimpleEncryptionType } from "../types.d.ts";
import {
  assert,
  type DecryptFunc,
  type EncryptFunc,
  type Test,
} from "./common.ts";

const KEY = "2dc4104a50a08a41f53d3a6f10700f9660833ad2b369660ad24aa8cbf1657544";
const IV = "c3b21a40f02858c45853f369143d0b44";
const PlainData = "3b461ac2-05d1-406a-9214-d835e42c27cd";

export const test_01_1_FlowWithAesGcmWithIv: Test = {
  id: "01-1",
  name: "Flow (AES-GCM) with IV",
  func: (args) => flow({ ...args, alg: "AES-GCM", iv: IV }),
};

export const test_01_2_FlowWithAesGcmWithoutIv: Test = {
  id: "01-2",
  name: "Flow (AES-GCM) without IV",
  func: (args) => flow({ ...args, alg: "AES-GCM" }),
};

export const test_01_3_FlowWithAesCbcWithIv: Test = {
  id: "01-3",
  name: "Flow (AES-CBC) with IV",
  func: (args) => flow({ ...args, alg: "AES-CBC", iv: IV }),
};

export const test_01_4_FlowWithAesCbcWithoutIv: Test = {
  id: "01-4",
  name: "Flow (AES-CBC) without IV",
  func: (args) => flow({ ...args, alg: "AES-CBC" }),
};

interface FlowArgs {
  alg: SimpleEncryptionType.SupportAlgorithm;
  decrypt: DecryptFunc;
  encrypt: EncryptFunc;
  iv?: string;
}

const flow = async ({ encrypt, decrypt, alg, iv }: FlowArgs): Promise<void> => {
  const encryptResult = await encrypt({
    alg,
    iv,
    key: KEY,
    plainData: new TextEncoder().encode(PlainData),
  });
  assert(encryptResult.alg, alg);
  if (iv != null) {
    assert(encryptResult.iv, iv);
  }

  const { plainData } = await decrypt({ ...encryptResult, key: KEY });
  assert(new TextDecoder().decode(plainData), PlainData);
};
