# Repero website branding assets

The deployed website source is the tracked flat-web package at `brand/logo/flat/web/`. Its files are copied unchanged to `public/brand/flat-web/` for Astro deployment.

- Header and footer on the night-ink site use `repero-mark-flat-inverted-transparent.svg`.
- Organization and publisher structured data use `repero-mark-flat-transparent.svg`.
- Browser icons use `/favicon.ico` as the conventional deployed fallback. It is a byte-identical copy of the flat-web package's tracked `favicon.ico`; the package remains the source for that ICO plus the 16px, 32px, and Apple touch derivatives.
- `public/social/repero-ai-social-preview.png` is the separate 1200 × 630 social fallback. It is composed from the canonical white/cyan wordmark and is not an icon or favicon.

This marketing site is not a PWA and intentionally emits no web manifest. Do not generate replacement icon derivatives here; refresh the flat-web package upstream, then copy the reviewed files into the public deployment path.
