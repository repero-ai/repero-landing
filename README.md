# Repero AI Landing Website

Public marketing website for Repero AI.

Repero AI helps users keep, organize and retrieve what they search, upload, generate and decide with AI.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages deployment

Recommended settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: use the version defined by the project
The public origin is fixed at `https://repero.ai`; preview hostnames are never emitted in SEO metadata.

Pages deploys the root locale Function automatically. It redirects `/` temporarily with a language-aware `302` and `Vary: Accept-Language`.

SEO routes:

- `/robots.txt`
- `/sitemap.xml`

You can configure bindings in the Cloudflare dashboard, or copy `wrangler.example.toml` to a local `wrangler.toml` if you want repository-free local configuration.

`wrangler.example.toml` is not deployed by Cloudflare. It is intentionally an example so the public repository does not publish project-specific infrastructure IDs. Do not commit a real `wrangler.toml` unless you intentionally want the repository to be the source of truth for Pages configuration.

## Public repository notice

This repository contains only the public marketing website for Repero AI.

Do not commit:

- secrets
- private infrastructure details
- backend configuration
- API keys
- pricing internals
- quota internals
- private product roadmap details

## License

All rights reserved.

See LICENSE.
