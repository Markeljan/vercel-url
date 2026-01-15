# vercel-url

[![npm version](https://img.shields.io/npm/v/vercel-url.svg)](https://www.npmjs.com/package/vercel-url)

A helper package that determines the Vercel deployment url `DEPLOYMENT_URL` at build time. Also provides easier access to Vercel system environment variables. Great for replacing `APP_URL`, `NEXT_PUBLIC_URL`, or other runtime URL resolution logic with a build-time constant.

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
- Can be used both server-side and client-side
- Provides easier access to Vercel system environment variables
- Supports tunnel URLs for local development with proxies (e.g., ngrok, Cloudflare Tunnel)

## How it works

This package determines the `DEPLOYMENT_URL` based on the environment:

- **In development** (when `VERCEL !== "1"`): 
  - Uses `TUNNEL_URL` if set (useful for tunnels/proxies like ngrok, Cloudflare Tunnel)
  - Adds `https://` protocol if `TUNNEL_URL` doesn't include a protocol
  - Otherwise defaults to `http://localhost:3000` (or the port specified in `PORT` env var)
- **In Vercel preview** (when `VERCEL_ENV === "preview"`): 
  - Uses `VERCEL_BRANCH_URL` if available (prefixed with `https://`)
  - Falls back to `VERCEL_URL` (prefixed with `https://`)
- **In Vercel production** (when `VERCEL_ENV === "production"`): 
  - Uses `VERCEL_PROJECT_PRODUCTION_URL` if available (prefixed with `https://`)
  - Falls back to `VERCEL_URL` (prefixed with `https://`)
- **Default fallback**: `https://${VERCEL_URL}` or `https://localhost:3000` if `VERCEL_URL` is not set

### Using TUNNEL_URL for Development

When developing locally with a tunnel service (like ngrok or Cloudflare Tunnel), you can set the `TUNNEL_URL` environment variable to override the default localhost URL:

```bash
# Example with ngrok
export TUNNEL_URL=https://abc123.ngrok.io
npm run dev

# Example with Cloudflare Tunnel
export TUNNEL_URL=https://your-tunnel.trycloudflare.com
npm run dev
```

The `TUNNEL_URL` can include the protocol (`https://`) or omit it - the package will add `https://` automatically if needed.

## Caveats

- The package prioritizes `VERCEL_BRANCH_URL` for preview deployments, which may include branch-specific URLs for preview builds
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
