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

Releases are owner-requested; [../AGENTS.md](../AGENTS.md) has the release checklist.

1. Validate on the release commit (it builds, checks budgets and runs the browser suite):
   ```bash
   npm run validate
   ```
2. Commit, push the branch, fast-forward `main` and push it.
3. Keep the running image as a rollback (manual retention, not cleanup authority):
   ```bash
   docker tag mouchsiadis-solutions-web:latest mouchsiadis-solutions-web:rollback-<previous-sha>
   ```
4. Deploy (builds the image with `npm ci && npm run build` and recreates only the `web` container):
   ```bash
   ./ops/deploy
   ```
5. Check:
   ```bash
   ./ops/status
   curl -sI https://mouchsiadis-solutions.com/en/
   ```
   Also open `/en/` (Simple view), `/en/?view=terminal` and one case file in a browser.
6. Record the release in `~/VPS_README.md` and the pointer list in `~/AGENTS.md`.

### Rollback

```bash
docker tag mouchsiadis-solutions-web:rollback-<sha> mouchsiadis-solutions-web:latest
docker compose --project-name mouchsiadis-solutions --env-file ~/envs/mouchsiadis-solutions.env -f deploy/compose.yaml up -d --no-build
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
