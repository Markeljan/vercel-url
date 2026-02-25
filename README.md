# vercel-url

[![npm version](https://img.shields.io/npm/v/vercel-url.svg)](https://www.npmjs.com/package/vercel-url)

A helper package that determines the Vercel deployment url `DEPLOYMENT_URL` at build time. It now resolves from framework-prefixed Vercel environment variables (for client bundles) and falls back to Vercel system environment variables (server/runtime), so the result stays consistent across server and client. Great for replacing `APP_URL`, `NEXT_PUBLIC_URL`, or other runtime URL resolution logic with a build-time constant.

## Installation

```bash
npm i vercel-url
```

or with Bun:

```bash
bun i vercel-url
```

## Usage

```javascript
import { DEPLOYMENT_URL } from "vercel-url";
```

You can also import individual Vercel environment variables:

```javascript
import {
	DEPLOYMENT_URL,
	VERCEL_ENV,
	VERCEL_URL,
	VERCEL_BRANCH_URL,
	VERCEL_PROJECT_PRODUCTION_URL
} from "vercel-url";
```

## Features

- Dynamically sets the URL at build time
- Can be used both server-side and client-side (via framework-prefixed Vercel env vars)
- Provides easier access to Vercel system environment variables
- Supports tunnel URLs for local development with proxies (e.g., ngrok, Cloudflare Tunnel)

## How it works

This package determines the `DEPLOYMENT_URL` based on the environment. It prefers framework-prefixed Vercel variables first (for example `NEXT_PUBLIC_VERCEL_URL`, `VITE_VERCEL_URL`, `PUBLIC_VERCEL_URL`) and falls back to Vercel system variables (`VERCEL_URL`, `VERCEL_BRANCH_URL`, etc.):

- **In development** (when `VERCEL !== "1"`): 
  - Uses `TUNNEL_URL` or `NEXT_PUBLIC_TUNNEL_URL` if set (useful for tunnels/proxies like ngrok, Cloudflare Tunnel)
  - Adds `https://` protocol if the tunnel URL doesn't include a protocol
  - Otherwise defaults to `http://localhost:3000` (or the port specified in `PORT` env var)
- **In Vercel preview** (when `VERCEL_ENV === "preview"` or the framework-prefixed equivalent):
  - Uses `VERCEL_BRANCH_URL` (or framework-prefixed equivalent) if available (prefixed with `https://` if needed)
  - Falls back to `VERCEL_URL` (or framework-prefixed equivalent)
- **In Vercel production** (when `VERCEL_ENV === "production"` or the framework-prefixed equivalent):
  - Uses `VERCEL_PROJECT_PRODUCTION_URL` (or framework-prefixed equivalent) if available (prefixed with `https://` if needed)
  - Falls back to `VERCEL_URL` (or framework-prefixed equivalent)
- **Default fallback**: `https://${VERCEL_URL}` (or framework-prefixed equivalent) or `https://localhost:3000` if no Vercel URL is available

### Framework Environment Variable Support

Vercel exposes framework-prefixed copies of system environment variables for client bundles (for example `NEXT_PUBLIC_VERCEL_URL` in Next.js). `vercel-url` reads those first so `DEPLOYMENT_URL` resolves the same value on both server and client.

Currently supported framework prefixes for `DEPLOYMENT_URL` resolution include:

- `NEXT_PUBLIC_`
- `NUXT_ENV_`
- `REACT_APP_`
- `GATSBY_`
- `VITE_`
- `PUBLIC_`
- `VUE_APP_`
- `REDWOOD_ENV_`
- `SANITY_STUDIO_`

### Using `TUNNEL_URL` / `NEXT_PUBLIC_TUNNEL_URL` for Development

When developing locally with a tunnel service (like ngrok or Cloudflare Tunnel), you can set either `TUNNEL_URL` or `NEXT_PUBLIC_TUNNEL_URL` to override the default localhost URL. If both are set, `TUNNEL_URL` takes precedence.

```bash
# Example with ngrok
export TUNNEL_URL=https://abc123.ngrok.io
npm run dev

# Example with Next.js-style public env var
export NEXT_PUBLIC_TUNNEL_URL=https://abc123.ngrok.io
npm run dev

# Example with Cloudflare Tunnel
export TUNNEL_URL=https://your-tunnel.trycloudflare.com
npm run dev
```

The tunnel URL (`TUNNEL_URL`, `NEXT_PUBLIC_TUNNEL_URL`, `VITE_TUNNEL_URL`, or `PUBLIC_TUNNEL_URL`) can include the protocol (`https://`) or omit it - the package will add `https://` automatically if needed.

## Caveats

- The package prioritizes `VERCEL_BRANCH_URL` (or its framework-prefixed equivalent) for preview deployments, which may include branch-specific URLs for preview builds
- Vercel does not automatically inject framework-prefixed env vars for local development, so local client-side tunnel overrides still require a public-prefixed tunnel var (for example `NEXT_PUBLIC_TUNNEL_URL`)
- When running locally (not on Vercel), `VERCEL_ENV`, `VERCEL_URL`, `VERCEL_BRANCH_URL`, and `VERCEL_PROJECT_PRODUCTION_URL` will be `undefined`

## Exported Variables

The package exports the following:

- `DEPLOYMENT_URL` - The resolved deployment URL (always a `string`)
- `VERCEL_ENV` - The Vercel environment (`production`, `preview`, or `development`) - `string | undefined`
- `VERCEL_URL` - The Vercel deployment URL - `string | undefined`
- `VERCEL_BRANCH_URL` - The branch-specific URL for preview deployments - `string | undefined`
- `VERCEL_PROJECT_PRODUCTION_URL` - The production URL for the project - `string | undefined`

**Important Notes**: 
- `DEPLOYMENT_URL` is always a string and will resolve to a valid URL in all environments
- `DEPLOYMENT_URL` prefers framework-prefixed Vercel env vars when available so the client and server resolve the same deployment URL
- The other Vercel environment variables (`VERCEL_ENV`, `VERCEL_URL`, etc.) may be `undefined` when not running on Vercel or when the specific variable is not available
- These variables are only included in your bundle if you explicitly import them. Modern bundlers (like esbuild, Rollup, Webpack) will tree-shake unused exports, so importing only `DEPLOYMENT_URL` will not include the other variables in your final bundle

## Benefits

1. Dynamic URL setting at build time
2. Values can be used both server-side and client-side
3. Seamless integration with Vercel deployments
4. Use Vercel system env variables directly without `process.env`

## Security Considerations

When using this package, keep in mind:

1. The `DEPLOYMENT_URL` is computed at build time and doesn't expose the individual environment variables used to derive it
2. If you only import `DEPLOYMENT_URL`, the other Vercel environment variables will not be exposed unless explicitly imported
3. If you choose to import and use the other variables (`VERCEL_ENV`, `VERCEL_URL`, etc.), ensure you're not unintentionally exposing sensitive information, although these variables are generally safe to use
4. The Vercel environment variables (`VERCEL_ENV`, `VERCEL_URL`, etc.) will be `undefined` when running outside of Vercel, so handle these cases appropriately in your code

## Additional Information

For more details on Vercel's system environment variables, refer to the [official Vercel documentation](https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables).

## License

[MIT](LICENSE)
