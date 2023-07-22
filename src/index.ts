// @deno-types="./types.d.ts"
import { DefaultAlg, getCrypto, getKey, getRandomBytes, toUint8Array } from "./common.ts";
import { Hex } from "./hex.ts";

export const encrypt = async (
  args: SimpleEncryption.EncryptArgs,
): Promise<SimpleEncryption.EncryptedData> => {
  const alg: SimpleEncryption.SupportAlgorithm = args.alg ?? DefaultAlg;
  const plainData: Uint8Array = toUint8Array(args.plainData);
  const key: CryptoKey = await getKey(toUint8Array(args.key), alg);
  const iv: Uint8Array = args.iv != null
    ? Hex.toBin(args.iv)
    : getRandomBytes(16, crypto);

  const encryptedData: ArrayBuffer = await getCrypto().subtle.encrypt(
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
): Promise<Uint8Array> => {
  const { alg } = args;
  const encryptedData: Uint8Array = Hex.toBin(args.data);
  const iv: Uint8Array = Hex.toBin(args.iv);
  const key: CryptoKey = await getKey(toUint8Array(args.key), alg);

  const plainData: ArrayBuffer = await getCrypto().subtle.decrypt(
    { name: alg, iv },
    key,
    encryptedData,
  );
  return new Uint8Array(plainData);
};
