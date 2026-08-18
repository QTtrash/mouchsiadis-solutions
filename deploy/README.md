# deploy

Runtime packaging for `mouchsiadis-solutions` behind the shared sibling [`vps-proxy` repo](/home/truegrind/projects/vps-proxy/README.md).

## Docs

- [../README.md](../README.md)
- [../docs/deployment.md](../docs/deployment.md)
- [../docs/proxy-integration.md](../docs/proxy-integration.md)

## Directory Structure

- `compose.yaml`: app stack
- `mouchsiadis-solutions.env.example`: production env template
- `nginx.conf`: static web server config
- `scripts/deploy.sh`: deploy entrypoint used by `./ops/deploy`

## Runtime Summary

This repo owns:

- `web`

TLS termination and host routing stay in the sibling proxy repo, not here.
