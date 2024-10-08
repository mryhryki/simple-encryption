# @mryhryki/simple-encryption

Simple encryption/decryption library for Node.js/Deno/Bun/Browser.

## Concept

- No dependencies, Only use [Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- Easy to use without detailed knowledge for encryption (Please use other libraries for complex usage)

## License

[MIT](./LICENSE)

## Demo Page (Browser)

- [Encrypt](https://mryhryki.github.io/simple-encryption/encrypt.html) ([Source](./docs/encrypt.html))
- [Decrypt](https://mryhryki.github.io/simple-encryption/decrypt.html) ([Source](./docs/decrypt.html))

## Support Runtime

This works on JavaScript runtimes that support the [Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).

This has been tested on these runtimes.

- [Node.js](https://nodejs.org/): `v18`, `v20`, `v22`, [`latest`](https://github.com/nodejs/release#release-schedule) ([Workflow file](https://github.com/mryhryki/simple-encryption/blob/update-readme/.github/workflows/check_node.yaml))
- [Deno](https://deno.land/): `v1.x`, `canary` ([Workflow file](https://github.com/mryhryki/simple-encryption/blob/update-readme/.github/workflows/check_deno.yaml))
- [Bun](https://bun.sh/): `latest`, `canary` ([Workflow file](https://github.com/mryhryki/simple-encryption/blob/update-readme/.github/workflows/check_bun.yaml))

## Supported Algorithm

You can use these algorithm:

- `AES-GCM` (Default, Recommended)
- `AES-CBC`

## How to Use

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

### Use by [Node.js](https://nodejs.org/)

Add `@mryhryki/simple-encryption` to your `package.json`:

```shell
$ npm install @mryhryki/simple-encryption
```

Set `"type": "module"` in your `package.json`.
(If you use bundler (webpack, esbuild, etc.), you may don't need to set this.)

```shell
# Check settings
$ cat package.json | grep '"type":'
  "type": "module",
```

Add `index.js` file:

```javascript
// If you are using Node.js v19 or later, there is `crypto` in `globalThis`, you don't need to import crypto.
//
// Ref:
// - https://github.com/nodejs/node/pull/42083
// - https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.0.0
import { webcrypto as crypto } from "crypto";
import { decrypt, encrypt } from "@mryhryki/simple-encryption";

(async () => {
  const key = "522a432195523d9f8cb65ee85c42e06f6e4f1839e8e6cf11a19631600e17d726"; // This value is sample
  const plainData = new TextEncoder().encode("cf0f2168-ddfc-4c98-be81-1d34e660dd1a"); // Use TextEncoder if you want to encrypt string

  // Encrypt
  const encryptResult = await encrypt({key, iv, plainData, crypto});
  console.log("Encrypt Result:", JSON.stringify(encryptResult, null, 2));

  // Decrypt
  const decryptResult = await decrypt({...encryptResult, key, crypto});
  console.log("Decrypt Result:", new TextDecoder().decode(decryptResult.plainData)); // Use TextDecoder if you want to decrypt as string
})();
```

And run `index.js` by Node.js:

```shell
$ node ./index.js
Encrypt Result: {
  "alg": "AES-GCM",
  "data": "955518aaedc18ed0a761d289a3a5fa91c69c003da99b11d1efa7282a0325d24049fe65fb67b6552d935a1a3407129120c00b9c47",
  "iv": "a7dd2a80bd982113ba5fe7a77a6b22b7"
}
Decrypt Result: cf0f2168-ddfc-4c98-be81-1d34e660dd1a
```

### Use by [Deno](https://deno.land/)

Add `index.js` file:

```javascript
// index.js
import { decrypt, encrypt } from "npm:@mryhryki/simple-encryption";
// or Using CDN
// import { decrypt, encrypt } from "https://cdn.skypack.dev/@mryhryki/simple-encryption";
// import { decrypt, encrypt } from "https://esm.sh/@mryhryki/simple-encryption";

const key = "522a432195523d9f8cb65ee85c42e06f6e4f1839e8e6cf11a19631600e17d726"; // This value is sample
const plainData = new TextEncoder().encode("cf0f2168-ddfc-4c98-be81-1d34e660dd1a"); // Use TextEncoder if you want to encrypt string

// Encrypt
const encryptResult = await encrypt({key, iv, plainData});
console.log("Encrypt Result:", JSON.stringify(encryptResult, null, 2));

// Decrypt
const decryptResult = await decrypt({...encryptResult, key});
console.log("Decrypt Result:", new TextDecoder().decode(decryptResult.plainData)); // Use TextDecoder if you want to decrypt as string
```

And run `index.js` by Deno:

```shell
$ deno run ./index.js
Encrypt Result: {
  "alg": "AES-GCM",
  "data": "955518aaedc18ed0a761d289a3a5fa91c69c003da99b11d1efa7282a0325d24049fe65fb67b6552d935a1a3407129120c00b9c47",
  "iv": "a7dd2a80bd982113ba5fe7a77a6b22b7"
}
Decrypt Result: cf0f2168-ddfc-4c98-be81-1d34e660dd1a
```

### Use by Browser

Add `index.js` file:

```javascript
(async () => {
  const { encrypt, decrypt } = await import("https://cdn.skypack.dev/@mryhryki/simple-encryption");
  // or
  // const {encrypt, decrypt} = await import("https://esm.sh/@mryhryki/simple-encryption")

  const key = "522a432195523d9f8cb65ee85c42e06f6e4f1839e8e6cf11a19631600e17d726"; // This value is sample
  const plainData = new TextEncoder().encode("cf0f2168-ddfc-4c98-be81-1d34e660dd1a"); // Use TextEncoder if you want to encrypt string

  // Encrypt
  const encryptResult = await encrypt({key, iv, plainData});
  console.log("Encrypt Result:", JSON.stringify(encryptResult, null, 2));

  // Decrypt
  const decryptResult = await decrypt({...encryptResult, key});
  console.log("Decrypt Result:", new TextDecoder().decode(decryptResult.plainData)); // Use TextDecoder if you want to decrypt as string
})();
```

Add HTML file and import `index.js` by `<script>` tag:

```html
<!-- index.html -->
...
<script src="./index.js"></script>
...
```

Open `index.html` by Browser and check that the following logs are output to the Developer Tools Console:

```plaintext
Encrypt Result: {
  "alg": "AES-GCM",
  "data": "955518aaedc18ed0a761d289a3a5fa91c69c003da99b11d1efa7282a0325d24049fe65fb67b6552d935a1a3407129120c00b9c47",
  "iv": "a7dd2a80bd982113ba5fe7a77a6b22b7"
}
Decrypt Result: cf0f2168-ddfc-4c98-be81-1d34e660dd1a
```

## API

### encrypt()

#### Arguments

| Name        | Type                                                        | Required | Description                                                 |
|-------------|-------------------------------------------------------------|----------|-------------------------------------------------------------|
| `alg`       | `string`                                                    | No       | Algorithm name: `AES-GCM` or `AES-CBC` (Default: `AES-GCM`) |
| `iv`        | `string` (Hex)                                              | No       | Initial vector. DON'T specify this if you don't need.       |
| `key`       | `string` (Hex)                                              | Yes      | Your secret key.                                            |
| `plainData` | `Uint8Array`                                                | Yes      | Plain data you want to encrypt.                             |
| `crypto`    | [Crypto](https://developer.mozilla.org/docs/Web/API/Crypto) | No       | Crypto object. Required if using Node.js (<19.x).           |

#### Return Value

| Name   | Type           | Description                                                                     |
|--------|----------------|---------------------------------------------------------------------------------|
| `alg`  | `string`       | Encrypt algorithm name. Same value as `args.alg` if you specified.              |
| `data` | `string` (Hex) | Encrypted data.                                                                 |
| `iv`   | `string` (Hex) | Initial vector. Use when decryption. Same value as `args.alg` if you specified. |

### decrypt()

#### Arguments

| Name     | Type                                                        | Required | Description                                                                           |
|----------|-------------------------------------------------------------|----------|---------------------------------------------------------------------------------------|
| `alg`    | `string`                                                    | Yes      | Algorithm name: `AES-GCM` or `AES-CBC`. Must specify same value as during encryption. |
| `data`   | `string` (Hex)                                              | Yes      | Encrypted data.                                                                       |
| `iv`     | `string` (Hex)                                              | Yes      | Initial vector. Must specify same value as during encryption.                         |
| `key`    | `string` (Hex)                                              | Yes      | Your secret key. Must specify same value as during encryption.                        |
| `crypto` | [Crypto](https://developer.mozilla.org/docs/Web/API/Crypto) | No       | Crypto object. Required if using Node.js (<19.x).                                     |

#### Return Value

| Name        | Type         | Description     |
|-------------|--------------|-----------------|
| `plainData` | `Uint8Array` | Decrypted data. |

## Development

1. Fork this repository.
2. Install [Deno](https://deno.land/manual@v1.35.0/getting_started/installation).
3. Edit source code.
4. Run test by `npm test`.
5. Push to GitHub and create Pull Request, so CI will run tests.

## Release

Run [release](https://github.com/mryhryki/simple-encryption/actions/workflows/release.yaml) workflow.
