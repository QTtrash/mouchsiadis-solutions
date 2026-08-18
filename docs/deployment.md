# Deployment

See also:

- [proxy-integration.md](./proxy-integration.md)
- [../deploy/README.md](../deploy/README.md)

## Runtime Shape

This repo owns only one runtime service:

- `web`

The `web` service is a static site build served by `nginx` in Docker.

## Layout

- App repo: `~/projects/mouchsiadis-solutions`
- App env: `~/envs/mouchsiadis-solutions.env`
- Shared proxy repo: `~/projects/vps-proxy`
- Shared proxy env: `~/envs/vps-proxy.env`

## Key Files

- `Dockerfile`
- `deploy/compose.yaml`
- `deploy/nginx.conf`
- `deploy/mouchsiadis-solutions.env.example`
- `deploy/scripts/deploy.sh`
- `ops/setup`
- `ops/deploy`
- `ops/status`
- `ops/update`

## First-Time VPS Setup

1. Create the env file:

```bash
./ops/setup
```

2. Review and adjust `~/envs/mouchsiadis-solutions.env`.

3. Make sure `../vps-proxy` contains the `MOUCHSIADIS_*` env values and matching Caddy block from [proxy-integration.md](./proxy-integration.md).

4. Make sure DNS for `mouchsiadis-solutions.com` and `www.mouchsiadis-solutions.com` points at the VPS before expecting TLS issuance.

5. Deploy the shared proxy from `../vps-proxy`.

6. Build and launch the app stack:

```bash
./ops/deploy
```

7. Inspect status:

```bash
./ops/status
```

## Routine Deploy

1. Pull the latest code.
2. Run:
   ```bash
   npm run build
   ./ops/deploy
   ```
3. Check:
   ```bash
   ./ops/status
   ```

## Environment Variables

Defined in `deploy/mouchsiadis-solutions.env.example`:

- `MOUCHSIADIS_PROJECT_NAME`
- `MOUCHSIADIS_ENV_FILE`
- `APP_PORT`
- `PROXY_UPSTREAM_ALIAS`
- `ROOT_DOMAIN`
- `WWW_DOMAIN`
- `APP_URL`

## Notes

- The container exposes port `80`.
- Compose binds the container to `127.0.0.1:${APP_PORT}` on the host.
- The `web` service also joins the external Docker network `shared-proxy` with alias `mouchsiadis-solutions-web`.
- Public TLS and domain routing are not handled here; they live in the sibling `vps-proxy` repo.
- The production image installs dependencies with `npm ci` and builds the site with `astro build`.
