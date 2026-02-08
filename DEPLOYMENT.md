# DEPLOYMENT.md

This project deploys to **Cloudflare Workers** as static assets from `dist`.

## 1. Prerequisites

- Cloudflare account
- GitHub repository connected to Cloudflare Workers Builds (or local Wrangler auth)
- Domain `thegreenmantra.com` added to Cloudflare DNS

## 2. Build + Deploy Worker

Build:

```bash
npm run build
```

Deploy:

```bash
npx wrangler deploy
```

`wrangler.jsonc` is configured to upload static assets from `./dist`.

## 3. Bind Custom Domain (Worker)

In Cloudflare dashboard:

1. Go to **Workers & Pages** -> **thegreenmantra**.
2. Open **Settings** -> **Domains & Routes**.
3. Add custom domains:
   - `thegreenmantra.com`
   - `www.thegreenmantra.com`

## 4. DNS and Nameservers

Because DNS is managed externally at registrar level, ensure nameservers for
`thegreenmantra.com` point to the Cloudflare nameservers assigned to your zone.

Check:

```bash
nslookup -type=NS thegreenmantra.com
```

## 5. Canonical URL Rule (`www` -> apex)

In Cloudflare dashboard -> **Rules** -> **Redirect Rules**, add a permanent rule:

- Source: `www.thegreenmantra.com/*`
- Destination: `https://thegreenmantra.com/$1`
- Status code: `301`

## 6. SSL/TLS

In Cloudflare dashboard -> **SSL/TLS**:

- Ensure active certificates for `thegreenmantra.com` and `www.thegreenmantra.com`
- Enable **Always Use HTTPS**
- Optional after stable rollout: enable HSTS

## 7. Verification Checklist

1. Worker deploy succeeds with no name mismatch warning.
2. `https://thegreenmantra.com` serves the latest site.
3. `https://www.thegreenmantra.com` returns `301` to apex.
4. `https://thegreenmantra.founder-994.workers.dev` still works as fallback.
