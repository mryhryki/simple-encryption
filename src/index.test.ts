import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { decrypt, encrypt } from "./index.ts";
import { SimpleEncryptionType } from "./types.d.ts";

const key = "314560f0574292fabeccc32a39de7f28";
const iv = "c3b21a40f02858c45853f369143d0b44";
const sampleData = "3b461ac2-05d1-406a-9214-d835e42c27cd";

const Algorithms: SimpleEncryptionType.SupportAlgorithm[] = [
  "AES-GCM",
  "AES-CBC",
];
await Promise.all(Algorithms.map((alg) => {
  Deno.test(`Encrypt/Decrypt: ${alg}`, async (t) => {
    let encryptResult: SimpleEncryptionType.EncryptedData = {
      alg,
      data: "(DUMMY)",
      iv: "(DUMMY)",
    };

    await t.step(`Encrypt: ${alg}`, async () => {
      encryptResult = await encrypt({
        alg,
        iv,
        key,
        plainData: new TextEncoder().encode(sampleData),
      });
      assertEquals(encryptResult.alg, alg, "arg");
      assertEquals(encryptResult.iv, iv, "iv");
    });

    await t.step(`Decrypt: ${alg}`, async () => {
      const { plainData } = await decrypt({ ...encryptResult, key });
      assertEquals(
        new TextDecoder().decode(plainData),
        sampleData,
        "decrypt result",
      );
    });
  });
}));

Deno.test("Compatibility (AES-CBC)", async (t) => {
  const PlainData =
    "RMQc7sORwEpfXljFKRdp5mxlaAOvsndumTsAt3IvPLAb6L15hZ9wWX8pDkm9EHNE1dVsGvy01AiiOaVUltKKrK2SBJrtzhzywunE";
  const EncryptData =
    "8c0310307c7928ac3d9a1dc54b18bc35e7f73e4d85c2f3271d53a38efafd19850171efb525060e860c0fe01cd363dad53573ed1c7dd01c3d845e5cd65017628e7ecfbf96449ad4c06f69d9e69d87afaf01a64875a4f48339973b60ca1493a7783ef9e1ee9f06c8270f41c6cb08d23959";
  const Key =
    "b940fe16e9d74d4ad66686d6345b16db742279983af0a38f7fbfc3fcdb3195d8";
  const IV = "55bb4e5f8996d0a9e6a8a62c5adcff5b";

  await t.step(
    `printf '${PlainData}' | openssl aes-256-cbc -K "${Key}" -iv "${IV}" -nosalt | xxd -p`,
    async () => {
      const result = await encrypt({
        alg: "AES-CBC",
        iv: IV,
        key: Key,
        plainData: new TextEncoder().encode(PlainData),
      });
      assertEquals(result.data, EncryptData);
    },
  );
});
