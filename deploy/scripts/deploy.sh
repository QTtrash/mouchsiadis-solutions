#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
ENV_FILE="${MOUCHSIADIS_ENV_FILE:-$HOME/envs/mouchsiadis-solutions.env}"
COMPOSE_FILE="${MOUCHSIADIS_COMPOSE_FILE:-$APP_ROOT/deploy/compose.yaml}"
PROJECT_NAME="${MOUCHSIADIS_PROJECT_NAME:-mouchsiadis-solutions}"

if docker compose version >/dev/null 2>&1; then
  compose_cmd=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  compose_cmd=(docker-compose)
else
  echo "Neither 'docker compose' nor 'docker-compose' is available." >&2
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE" >&2
  echo "Run ./ops/setup from the repo root, then fill in the real values." >&2
  exit 1
fi

"${compose_cmd[@]}" \
  --project-name "$PROJECT_NAME" \
  --env-file "$ENV_FILE" \
  -f "$COMPOSE_FILE" \
  up -d --build --remove-orphans
