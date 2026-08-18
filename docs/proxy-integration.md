# Proxy Integration

See also:

- [deployment.md](./deployment.md)

## Purpose

`mouchsiadis-solutions` follows the same VPS pattern as sibling projects:

- this repo owns the app container
- `../vps-proxy` owns ports `80` and `443`, TLS, and public host routing

## Required Proxy Variables

The proxy env file must contain:

```env
MOUCHSIADIS_ROOT_DOMAIN=mouchsiadis-solutions.com
MOUCHSIADIS_WWW_DOMAIN=www.mouchsiadis-solutions.com
MOUCHSIADIS_UPSTREAM=mouchsiadis-solutions-web:80
```

## Required Caddy Block

The proxy Caddyfile must contain:

```caddy
{$MOUCHSIADIS_WWW_DOMAIN} {
  redir https://{$MOUCHSIADIS_ROOT_DOMAIN}{uri} permanent
}

{$MOUCHSIADIS_ROOT_DOMAIN} {
  encode gzip zstd

  header {
    Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options "nosniff"
    X-Frame-Options "SAMEORIGIN"
    Referrer-Policy "strict-origin-when-cross-origin"
  }

  reverse_proxy {$MOUCHSIADIS_UPSTREAM}
}
```

## Caddy Behavior

- `www.mouchsiadis-solutions.com` redirects permanently to `https://mouchsiadis-solutions.com`.
- `mouchsiadis-solutions.com` reverse proxies to `mouchsiadis-solutions-web:80`.

## Deployment Note

The sibling `vps-proxy` repo must be updated directly with the values and Caddy block above, then redeployed with `../vps-proxy/ops/deploy`.
