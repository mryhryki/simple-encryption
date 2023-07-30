// @deno-types="./types.d.ts"
import { checkIvLength } from "./check.ts";
import { DefaultAlg, getKey, getRandomBytes } from "./common.ts";
import { Hex } from "./hex.ts";

export const encrypt = async (
  args: SimpleEncryption.EncryptArgs,
  crypto: Crypto = globalThis.crypto,
): Promise<SimpleEncryption.EncryptedData> => {
  const alg: SimpleEncryption.SupportAlgorithm = args.alg ?? DefaultAlg;
  const plainData: Uint8Array = args.plainData;
  const key: CryptoKey = await getKey(Hex.toBin(args.key), alg, crypto);
  const iv: Uint8Array = checkIvLength(
    args.iv != null ? Hex.toBin(args.iv) : getRandomBytes(16, crypto),
  );

  const encryptedData: ArrayBuffer = await crypto.subtle.encrypt(
    { name: alg, iv },
    key,
    plainData,
  );

  return {
    alg,
    data: Hex.fromBin(new Uint8Array(encryptedData)),
    iv: Hex.fromBin(iv),
  };
};

export const decrypt = async (
  args: SimpleEncryption.DecryptArgs,
  crypto: Crypto = globalThis.crypto,
): Promise<SimpleEncryption.DecryptedData> => {
  const { alg } = args;
  const encryptedData: Uint8Array = Hex.toBin(args.data);
  const iv: Uint8Array = checkIvLength(Hex.toBin(args.iv));
  const key: CryptoKey = await getKey(Hex.toBin(args.key), alg, crypto);

  const plainData: ArrayBuffer = await crypto.subtle.decrypt(
    { name: alg, iv },
    key,
    encryptedData,
  );

  return {
    plainData: new Uint8Array(plainData),
  };
};
