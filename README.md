# outlabs-taskq-docs

Public documentation site for [outlabs-taskq](https://github.com/outlabsio/outlabs-taskq).

Carbon copy of the [outlabsAuth-docs](https://github.com/outlabsio/outlabsAuth-docs) Nuxt shell, with taskq content and branding.

| Env | URL | Worker |
|---|---|---|
| Production | https://taskq.outlabs.io | `outlabs-taskq-docs` |
| Staging | https://taskq-staging.outlabs.io | `outlabs-taskq-docs-staging` |

## Develop

```bash
bun install
bun run dev
```

## Build / deploy

```bash
bun run deploy:staging
bun run deploy:production
```

Custom domains are live (`taskq.outlabs.io`). A dedicated Umami website id still needs provisioning (do not reuse the auth docs analytics id).

## Branding assets

Source wordmark: `public/tasq.svg` (Pixelmator export). Regenerate derived assets with:

```bash
bun run brand:generate
```

| File | Role |
|---|---|
| `tasq.svg` | Canonical source (white wordmark + orange Q `#ff634d`) |
| `outlabsTaskqLogo.svg` | Light-mode wordmark (dark ink + orange Q) |
| `outlabsTaskqLogo-dark.svg` | Dark-mode wordmark (white ink + orange Q) |
| `outlabsTaskqIcon.svg` | Orange Q crop (tight viewBox) |
| `outlabsTaskqIcon-mark.svg` | Square Q mark for favicon / schema.org |
| `favicon.ico` / `favicon-32x32.png` / `apple-touch-icon.png` | Raster favicons from the Q mark |

## Content

Markdown lives under `content/`. Navigation is file-based (numbered folders + `.navigation.yml`).

The content target is released package `0.1.0a18`, SQL contract `0.2.6`, and
Protocol document revision `1.0.15`. Audit examples against the public
`outlabs-taskq` tree and keep private consumer names, rollout evidence, and
deployment paths out of this repository.
