# simple-encryption

Simple encryption/decryption library for Node.js/Deno/Browser.

## Concept

- No dependencies, Only [Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- Easy to use without detailed knowledge for encryption (Please use a different library for complex usage)

## Secret Key

(TODO)

```shell
# Generate by OpenSSL
$ openssl rand -hex 16

# Generate by Node.js
# Generate by Deno
```

## Supported Algorithm

You can use `AES-CTR`, `AES-CBC`, `AES-GCM`, or `AES-KW`.
These algorithms are supported by [importKey\(\) method](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey).

But this library are tested by only with `AES-GCM` and we recommend using the algorithm.

## Development

1. Install [Deno](https://deno.land/manual@v1.35.0/getting_started/installation)
