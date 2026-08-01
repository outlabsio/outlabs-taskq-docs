# outlabs-taskq-docs

Public documentation site for [outlabs-taskq](https://github.com/outlabsio/outlabs-taskq).

Carbon copy of the [outlabsAuth-docs](https://github.com/outlabsio/outlabsAuth-docs) Nuxt shell, with taskq content and branding.

| Env | URL | Worker |
|---|---|---|
| Production | https://taskq.outlabs.io | `outlabs-taskq-docs` |
| Staging | https://taskq-staging.outlabs.io | `outlabs-taskq-docs-staging` |

## Develop

```bash
pnpm install   # or bun install
pnpm dev
```

## Build / deploy

```bash
pnpm run build:staging
pnpm run deploy:staging

pnpm run build:production
pnpm run deploy:production
```

Cloudflare custom domains and a dedicated Umami website id still need to be provisioned (do not reuse the auth docs analytics id).

## Branding assets

- `public/outlabsTaskqLogo.svg` — wordmark
- `public/outlabsTaskqIcon.svg` — mark (placeholder; replace with final art when ready)
- Favicons are still the auth-set placeholders until regenerated

## Content

Markdown lives under `content/`. Navigation is file-based (numbered folders + `.navigation.yml`).
