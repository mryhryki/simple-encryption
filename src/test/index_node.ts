import * as crypto from "crypto";
import { test } from "./index.ts";

globalThis.crypto = crypto.webcrypto;

test()
