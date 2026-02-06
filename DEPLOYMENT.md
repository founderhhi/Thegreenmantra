# DEPLOYMENT.md

This project deploys as a static site on Cloudflare Pages.

## 1. Prerequisites

- Cloudflare account
- Repository pushed to GitHub (recommended) or direct deploy using Wrangler
- Node 22+ locally

## 2. Build Settings (Cloudflare Pages)

In Cloudflare dashboard:

1. Go to **Workers & Pages** -> **Create** -> **Pages**.
2. Connect your Git repository.
3. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: `22`

## 3. Environment Variables

Set in Pages project settings -> Variables:

- `VITE_FORM_ENDPOINT` = your form endpoint (for example FormSubmit AJAX endpoint)

## 4. Optional CLI Deploy

Authenticate:

```bash
npx wrangler whoami
```

Direct deploy:

```bash
npx wrangler pages deploy dist --project-name=<your-project-name>
```

## 5. Custom Domain + DNS

### If domain is on Cloudflare

1. Open your Pages project -> **Custom domains** -> **Set up a custom domain**.
2. Add root domain (`example.com`) and optional `www.example.com`.
3. Cloudflare will create/guide DNS records automatically.

### If domain is with external registrar

1. Add domain in Cloudflare Pages first.
2. Create DNS records at your provider as instructed by Cloudflare.
   - Typical pattern: `www` CNAME to `<project>.pages.dev`
   - Root/apex domain setup follows Cloudflare-provided target and flattening guidance.

## 6. HTTPS

- Cloudflare Pages provisions SSL automatically.
- Verify in Cloudflare dashboard -> SSL/TLS:
  - Encryption mode: `Full` (or `Full (strict)` if origin cert setup requires it)
  - Keep `Always Use HTTPS` enabled.

## 7. Post-Deploy Checks

- Verify all 5 pages load and nav links work.
- Verify form success/error messages on Contact page.
- Verify image loading and mobile responsiveness.
- Verify no 404s for `/assets/*` resources.
