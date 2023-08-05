import { webcrypto } from "node:crypto";
import { test } from "./index.js";
import { decrypt, encrypt } from "@mryhryki/simple-encryption";

globalThis.crypto = webcrypto;
test({ encrypt, decrypt });
