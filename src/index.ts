import { checkIvLength } from "./check.ts";
import { DefaultAlg, getKey, getRandomBytes } from "./common.ts";
import { Hex } from "./hex.ts";
import type { SimpleEncryptionType } from "./types.d.ts";

export const encrypt = async (
  args: SimpleEncryptionType.EncryptArgs,
): Promise<SimpleEncryptionType.EncryptedData> => {
  const alg: SimpleEncryptionType.SupportAlgorithm = args.alg ?? DefaultAlg;
  const plainData: Uint8Array = args.plainData;
  const key: CryptoKey = await getKey(Hex.toBin(args.key), alg);
  const iv: Uint8Array = checkIvLength(
    args.iv != null ? Hex.toBin(args.iv) : getRandomBytes(16),
  );

  const encryptedData: ArrayBuffer = await crypto.subtle.encrypt(
    { name: alg, iv: iv.buffer as ArrayBuffer },
    key,
    plainData.buffer as ArrayBuffer,
  );

  return {
    alg,
    data: Hex.fromBin(new Uint8Array(encryptedData)),
    iv: Hex.fromBin(iv),
  };
};

export const decrypt = async (
  args: SimpleEncryptionType.DecryptArgs,
): Promise<SimpleEncryptionType.DecryptedData> => {
  const { alg } = args;
  const encryptedData: Uint8Array = Hex.toBin(args.data);
  const iv: Uint8Array = checkIvLength(Hex.toBin(args.iv));
  const key: CryptoKey = await getKey(Hex.toBin(args.key), alg);

  const plainData: ArrayBuffer = await crypto.subtle.decrypt(
    { name: alg, iv: iv.buffer as ArrayBuffer },
    key,
    encryptedData.buffer as ArrayBuffer,
  );

  return {
    plainData: new Uint8Array(plainData),
  };
};
