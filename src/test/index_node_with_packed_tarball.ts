import * as crypto from "crypto";
import { test } from "./index.ts";
import { decrypt, encrypt } from "@mryhryki/simple-encryption";

globalThis.crypto = crypto.webcrypto;
test({ encrypt, decrypt });
