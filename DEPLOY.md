# Deployment Guide — codingclub.tech Redesign

This guide provides technical deployment instructions for transitioning the static redesign prototype to production.

---

## 1. Hosting Target Architecture

The redesign is configured as a pure static HTML/CSS/JS export in `out/` (`output: 'export'` in `next.config.ts`). It has zero Node.js runtime server dependencies and can be hosted on modern global edge CDNs.

### Recommended Targets:
- **Cloudflare Pages** (Recommended): Unlimited bandwidth, global edge distribution, automatic HTTPS, zero cold starts.
  - Build command: `npm run build`
  - Build output directory: `out`
  - Node version: `20.x` or later
- **Netlify**:
  - Build command: `npm run build`
  - Publish directory: `out`
- **Vercel** (Static Export Mode):
  - Output Directory: `out`

---

## 2. Current Infrastructure & Server Decommissioning

- **Current Live Host**: Running `nginx/1.10.3` on Ubuntu 16.04 LTS (end-of-life).
- **Current Performance Penalty**: Monolithic uncompressed HTML (247 KB), HTTP/1.1 without modern HTTP/2 or HTTP/3 multiplexing, missing cache headers, and insecure origin headers.
- **Action**: Decommission the legacy Nginx VM once DNS cutover to Cloudflare Pages / Netlify is complete.

---

## 3. Required DNS Cutover Steps

To point `codingclub.tech` to Cloudflare Pages or Netlify:
1. Obtain access to the domain registrar / DNS provider for `codingclub.tech`.
2. Configure apex and `www` records:
   - For Cloudflare Pages: Add `CNAME` for `codingclub.tech` pointing to `<project-name>.pages.dev`.
   - For Netlify: Add `A` record pointing to `75.2.60.5` (or Netlify apex load balancer) and `CNAME` for `www` to `<site-name>.netlify.app`.
3. Provision automatic SSL/TLS certificates via the hosting platform.

---

## 4. Lead Capture Form Wiring (CRITICAL)

> **WARNING: The current form endpoint is a development stub.**
> In the prototype, `/api/lead` simply logs to the browser console and returns a simulated success state. It **does NOT persist data** to a database, CRM, Google Sheet, or email inbox.

### Production Wiring Requirements:
Before taking this page live, wire the form in `components/FinalCtaAndFooter.tsx` (`handleSubmit`) to an active lead handling service:
1. **Option A: Webhook to CRM / Google Sheets**
   - Use Zapier, Make.com, or an API route connecting to HubSpot / Zoho / Airtable.
   - Forward fields: `name`, `email`, `phone` (with timestamp and UTM query parameters).
2. **Option B: Serverless Function**
   - Cloudflare Pages Function at `/functions/api/lead.ts` or Netlify Function at `/netlify/functions/lead.ts`.
3. **Option C: Form Backend Service**
   - Formspree, Basin, or Formkeep endpoint.

---

## 5. Verification Checklist Before Cutover

1. `npx tsx scripts/verify-parity.ts` passes (100% Bijection).
2. `npx tsx scripts/verify-copy.ts` passes (0 copy mutations).
3. `npm run build` executes with zero errors.
4. Form submission sends leads to verified CRM/database and displays success confirmation.
5. All 36 WebP images load correctly under the production domain.
