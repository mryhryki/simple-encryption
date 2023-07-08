import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { DefaultAlg } from "./common.ts";
import { encrypt, decrypt } from "./index.ts";

const alg = DefaultAlg;
const key = "314560f0574292fabeccc32a39de7f28";
const iv = "c3b21a40f02858c45853f369143d0b44";
const sampleData = "3b461ac2-05d1-406a-9214-d835e42c27cd";

Deno.test("encrypt/decrypt", async (t) => {
  let encryptResult: SimpleEncryption.EncryptedData = { alg, data: "(DUMMY)", iv: "(DUMMY)" };
  await t.step("encrypt", async () => {
    encryptResult = await encrypt({ alg, iv, key, plainData: sampleData });
    assertEquals(encryptResult.alg, alg, "arg");
    assertEquals(encryptResult.iv, iv, "iv");
  });
  await t.step("decrypt", async () => {
    const decryptResult = await decrypt({ ...encryptResult, key });
    assertEquals(new TextDecoder().decode(decryptResult), sampleData, 'decrypt result');
  });
});

