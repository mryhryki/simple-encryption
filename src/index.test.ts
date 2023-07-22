import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { decrypt, encrypt } from "./index.ts";

const key = "314560f0574292fabeccc32a39de7f28";
const iv = "c3b21a40f02858c45853f369143d0b44";
const sampleData = "3b461ac2-05d1-406a-9214-d835e42c27cd";

const Algorithms: SimpleEncryption.SupportAlgorithm[] = ["AES-GCM", "AES-CBC"];
await Promise.all(Algorithms.map(async (alg) => {
  Deno.test(`Encrypt/Decrypt: ${alg}`, async (t) => {
    let encryptResult: SimpleEncryption.EncryptedData = {
      alg,
      data: "(DUMMY)",
      iv: "(DUMMY)",
    };

    await t.step(`Encrypt: ${alg}`, async () => {
      encryptResult = await encrypt({ alg, iv, key, plainData: new TextEncoder().encode(sampleData) });
      assertEquals(encryptResult.alg, alg, "arg");
      assertEquals(encryptResult.iv, iv, "iv");
    });

    await t.step(`Decrypt: ${alg}`, async () => {
      const decryptResult = await decrypt({ ...encryptResult, key });
      assertEquals(
        new TextDecoder().decode(decryptResult),
        sampleData,
        "decrypt result",
      );
    });
  });
}));

// Deno.test("Compatibility", async (t) => {
//   const PlainData = "RMQc7sORwEpfXljFKRdp5mxlaAOvsndumTsAt3IvPLAb6L15hZ9wWX8pDkm9EHNE1dVsGvy01AiiOaVUltKKrK2SBJrtzhzywunE";
//   const EncryptData = "5e856e41db1adf321ea09b517e1328fc0fb0102edf48287497d00a05324f435f3e3f437b2295bed3b47a1651675ec85700a0aa47ddaef947e1d4051d2db063958d4bc4d50262606c486d95091e9082fe90d98af1a0f669e833f9b1fcba96229ba59fe9565371f88e76d7631a3b28e290";
//   const Key = "542a72b41e203b71c7f62c6be6b9bd41";
//   const IV = "55bb4e5f8996d0a9e6a8a62c5adcff5b";
//
//   await t.step(`printf '${PlainData}' | openssl aes-256-cbc -K "${Key}" -iv "${IV}" -nosalt | xxd -p`, async () => {
//     const result = await encrypt({ alg: "AES-CBC", iv: IV, key: Key, plainData: PlainData });
//     assertEquals(result.data, EncryptData);
//   });
// });
