import {
  test_01_1_FlowWithAesGcmWithIv,
  test_01_2_FlowWithAesGcmWithoutIv,
  test_01_3_FlowWithAesCbcWithIv,
  test_01_4_FlowWithAesCbcWithoutIv,
} from "./01_flow.ts";
import {
  test_02_1_EncryptWithAesGcm,
  test_02_2_EncryptWithAesCbc,
} from "./02_encrypt.ts";
import {
  test_03_1_DecryptWithAesGcm,
  test_03_2_DecryptWithAesCbc,
} from "./03_decrypt.ts";
import { Test } from "./common.ts";

const tests: Test[] = [
  test_01_1_FlowWithAesGcmWithIv,
  test_01_2_FlowWithAesGcmWithoutIv,
  test_01_3_FlowWithAesCbcWithIv,
  test_01_4_FlowWithAesCbcWithoutIv,
  test_02_1_EncryptWithAesGcm,
  test_02_2_EncryptWithAesCbc,
  test_03_1_DecryptWithAesGcm,
  test_03_2_DecryptWithAesCbc,
];

export const test = async () => {
  const testIds = tests.map((t) => t.id);
  if (testIds.length !== new Set(testIds).size) {
    throw new Error("Duplicate test id");
  }

  let errorCount = 0;

  for await (const { name, func } of tests) {
    console.log(`Running test: ${name}`);
    await func()
      .then(() => {
        console.log("  => OK");
      })
      .catch((err) => {
        console.log("  => NG:", err);
        errorCount++;
      });
  }

  console.log("")
  if (errorCount > 0) {
    throw new Error(`Tests failed: ${errorCount}/${tests.length}`);
  }
};

test();
