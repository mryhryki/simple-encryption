⚠️⚠️⚠️ **NOTICE: This library is under implementing** ⚠️⚠️⚠️

# @mryhryki/simple-encryption

Simple encryption/decryption library for Node.js/Deno/Browser.

## Concept

- No dependencies, Only use
  [Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- Easy to use without detailed knowledge for encryption (Please use a different
  library for complex usage)

## Support Runtime

- Node.js ([LTS versions](https://github.com/nodejs/release#release-schedule): v16, v18, v20)
- Deno
- Browser

## Supported Algorithm

You can use these algorithm:

- `AES-GCM` (Default, Recommended)
- `AES-CBC`

## How to Use

### Install

```shell
$ npm install @mryhryki/simple-encryption
```

### Generate Secret Key

NOTICE: The generated secret key must be kept secret.

```shell
# Generate by OpenSSL
$ openssl rand -hex 32
51bf5c934cc23e8498fdb636eed56c05fb0dc6d148a127a34c118b0fced1fc22 # Example Value (256 bits hex string)

# Generate by Node.js
cat << EOS | node
const crypto = require("crypto");
const arr = new Uint8Array(32);
crypto.getRandomValues(arr);
console.log(Buffer.from(arr).toString("hex"));
EOS

# Generate by Deno
cat << EOS | deno
import { encode } from "https://deno.land/std@0.193.0/encoding/hex.ts";
const arr = new Uint8Array(32);
crypto.getRandomValues(arr);
console.log(new TextDecoder().decode(encode(arr)));
EOS
```

### Use in JavaScript

```javascript
import {decrypt, encrypt} from "@mryhryki/simple-encryption";

// Set generated secret key (Hex string)
const key = "522a432195523d9f8cb65ee85c42e06f6e4f1839e8e6cf11a19631600e17d726"; // This value is sample
// Set data that you want to encryption (Uint8Array)
const plainData = new TextEncoder().encode("cf0f2168-ddfc-4c98-be81-1d34e660dd1a"); // Use TextEncoder if you want to encrypt string

const encryptResult = await encrypt({ key, plainData });
console.log("Encrypt Result:", JSON.stringify(encryptResult, null, 2));
// Encrypt Result: {
//   "alg": "AES-GCM",
//   "data": "4b26dbb5489924f31d4a3377b8310e8673c053bb23a47b1f72ad2de58ddbdbb1dab731fff2b1308027b02e0b82658d026c34ebcb",
//   "iv": "b39eb660f1e7cdfbdf3e73381de5a316"
// }

const decryptResult = await decrypt({ ...encryptResult, key });
console.log("Decrypt Result:", new TextDecoder().decode(decryptResult.plainData)); // Use TextDecoder if you want to decrypt as string
// Decrypt Result: cf0f2168-ddfc-4c98-be81-1d34e660dd1a
```

## API

### encrypt()

#### Arguments

| Name             | Type           | Required | Description                                                 |
|------------------|----------------|----------|-------------------------------------------------------------|
| `args`           | `object`       | Yes      | Arguments object.                                           |
| `args.alg`       | `string`       | No       | Algorithm name: `AES-GCM` or `AES-CBC` (Default: `AES-GCM`) |
| `args.iv`        | `string` (Hex) | No       | Initial vector.                                             |
| `args.key`       | `string` (Hex) | Yes      | Your secret key.                                            |
| `args.plainData` | `Uint8Array`   | Yes      | Plain data you want to encrypt.                             |
| `crypto`         | Crypto         | No       | Crypto object. Required if using Node.js.                   |

#### Return Value

| Name   | Type           | Description                                                                     |
|--------|----------------|---------------------------------------------------------------------------------|
| `alg`  | `string` (Hex) | Encrypt algorithm name. Same value as `args.alg` if you specified.              |
| `data` | `string` (Hex) | Encrypted data.                                                                 |
| `iv`   | `string` (Hex) | Initial vector. Use when decryption. Same value as `args.alg` if you specified. |

### decrypt()

#### Arguments

| Name        | Type           | Required | Description                                                                           |
|-------------|----------------|----------|---------------------------------------------------------------------------------------|
| `args`      | `object`       | Yes      | Arguments object.                                                                     |
| `args.alg`  | `string`       | Yes      | Algorithm name: `AES-GCM` or `AES-CBC`. Must specify same value as during encryption. |
| `args.data` | `string` (Hex) | Yes      | Encrypted data.                                                                       |
| `args.iv`   | `string` (Hex) | Yes      | Initial vector. Must specify same value as during encryption.                         |
| `args.key`  | `string` (Hex) | Yes      | Your secret key. Must specify same value as during encryption.                        |
| `crypto`    | Crypto         | No       | Crypto object. Required if using Node.js.                                             |

#### Return Value

| Name        | Type         | Description     |
|-------------|--------------|-----------------|
| `plainData` | `Uint8Array` | Decrypted data. |

## Development

1. Install [Deno](https://deno.land/manual@v1.35.0/getting_started/installation)
2. Editing source code.
3. Run `deno test` to run test.
