⚠️⚠️⚠️ **NOTICE: This library is under implementing** ⚠️⚠️⚠️

# @mryhryki/simple-encryption

Simple encryption/decryption library for Node.js/Deno/Browser.

## Concept

- No dependencies, Only use [Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- Easy to use without detailed knowledge for encryption (Please use a different library for complex usage)

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

```shell
# Generate by OpenSSL
$ openssl rand -hex 16

# Generate by Node.js
cat << EOS | node
const crypto = require("crypto");
const arr = new Uint8Array(16);
crypto.getRandomValues(arr);
console.log(Buffer.from(arr).toString("hex"));
EOS

# Generate by Deno
cat << EOS | deno
import { encode } from "https://deno.land/std@0.193.0/encoding/hex.ts";
const arr = new Uint8Array(16);
crypto.getRandomValues(arr);
console.log(new TextDecoder().decode(encode(arr)));
EOS
```

### Use in JavaScript

```javascript
import { encrypt, decrypt } from "@mryhtyki"

const key = "(Set generated secret key. Keep this value secret.)"
const plainData = "(Set data that you want to encryption)"

const encryptResult = await encrypt({ key, plainData });
console.log("Encrypt Result:", JSON.stringify(encryptResult, null, 2));
// Encrypt Result: {
//   "alg": "AES-GCM",
//   "data": "a250...",
//   "iv": "7fbe..."
// }

const decryptResult = await decrypt({ ...encryptResult, key });
console.log("Decrypt Result is Uint8Array?:", decryptResult instanceof Uint8Array);
// Decrypt Result is Uint8Array?: true
console.log("Decrypt Result:", JSON.stringify(decryptResult, null, 2));
// Decrypt Result: {
//  "0": 40,
//  "1": 83,
//  "2": 101,
//  ...
// }
```

## API

### `encrypt`

### `decrypt`

## Development

1. Install [Deno](https://deno.land/manual@v1.35.0/getting_started/installation)
