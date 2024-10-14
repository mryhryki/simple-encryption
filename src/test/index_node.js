import * as crypto from "node:crypto";
import { decrypt, encrypt } from "@mryhryki/simple-encryption";
import { test } from "./index.js";

// Node.js v19 and later, there is `crypto` in `globalThis`.
//
// Ref:
//   - https://github.com/nodejs/node/pull/42083
//   - https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.0.0
if (!("crypto" in globalThis)) {
  globalThis.crypto = crypto.webcrypto;
}

test({ encrypt, decrypt });
