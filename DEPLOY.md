# Deploying IlongGo! to Cloudflare Pages

## Prerequisites
```bash
npm install
```

## Step 1 — Create D1 database
```bash
npx wrangler d1 create ilonggo-db --location apac
```
Copy the `database_id` printed and replace `YOUR_D1_DATABASE_ID` in `wrangler.toml`.

## Step 2 — Apply migrations (local test first)
```bash
npx wrangler d1 migrations apply ilonggo-db --local
```
Then apply to production:
```bash
npx wrangler d1 migrations apply ilonggo-db
```

## Step 3 — Build
```bash
npm run build
```

## Step 4 — Deploy
```bash
npx wrangler pages deploy dist --project-name ilonggo-transit
```

## Step 5 — Local dev with D1 binding
```bash
npx wrangler pages dev dist --d1=DB=ilonggo-db
```

## Environment variables
Copy `.env.example` to `.env` and set:
```
VITE_API_URL=https://ilonggo-transit.pages.dev
```
Leave `VITE_API_URL` blank to use mock data locally.

## Cloudflare Pages dashboard bindings
| Binding | Type | Value          |
|---------|------|----------------|
| DB      | D1   | ilonggo-db     |
