// @deno-types="./types.d.ts"
import { DefaultAlg, getKey, getRandomBytes, toUint8Array } from "./common.ts";
import { Hex } from "./hex.ts";

export const encrypt = async (
  args: SimpleEncryption.EncryptArgs,
): Promise<SimpleEncryption.EncryptedData> => {
  const alg: SimpleEncryption.SupportAlgorithm = args.alg ?? DefaultAlg;
  const plainData: Uint8Array = toUint8Array(args.plainData);
  const iv: Uint8Array = typeof (args.iv) === "string"
    ? Hex.toBin(args.iv)
    : toUint8Array(args.iv ?? getRandomBytes(16, crypto));
  const key: CryptoKey = await getKey(toUint8Array(args.key), alg);

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
  crypto = window.crypto,
): Promise<Uint8Array> => {
  const { alg } = args;
  const encryptedData: Uint8Array = Hex.toBin(args.data);
  const iv: Uint8Array = Hex.toBin(args.iv);
  const key: CryptoKey = await getKey(toUint8Array(args.key), alg);

  const plainData: ArrayBuffer = await crypto.subtle.decrypt(
    { name: alg, iv },
    key,
    encryptedData,
  );
  return new Uint8Array(plainData);
};
