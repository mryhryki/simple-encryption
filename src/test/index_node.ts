import * as crypto from "crypto";
import { test } from "./index.ts";
import { decrypt, encrypt } from "../index.ts";

globalThis.crypto = crypto.webcrypto;
test({ encrypt, decrypt });
