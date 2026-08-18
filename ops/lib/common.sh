#!/usr/bin/env bash

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
project_name="mouchsiadis-solutions"
env_file="${MOUCHSIADIS_ENV_FILE:-$HOME/envs/mouchsiadis-solutions.env}"
compose_file="$repo_root/deploy/compose.yaml"

ensure_env_file() {
  if [[ ! -f "$env_file" ]]; then
    echo "Missing env file: $env_file" >&2
    echo "Run ./ops/setup first, then fill in the real values." >&2
    exit 1
  fi
}

compose_cmd() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
    return
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
    return
  fi

  echo "Neither 'docker compose' nor 'docker-compose' is available." >&2
  exit 1
}
