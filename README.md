# vercel-url

A helper package that calculates the Vercel DEPLOYMENT_URL at build time and exposes Vercel system environment variables.

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

## Features

- Dynamically sets the URL at build time
- Can be used both server-side and client-side
- Exposes Vercel system environment variables

## How it works

This package determines the `DEPLOYMENT_URL` based on the Vercel environment:

- In production: Uses `VERCEL_PROJECT_PRODUCTION_URL`
- In preview: Uses `VERCEL_BRANCH_URL` if available, otherwise `VERCEL_URL`
- In development: Defaults to `http://localhost:3000`

## Caveats

- Preview builds from branch commits may not work as expected because `VERCEL_BRANCH_URL` will be present.
- There's no simple way to detect this at build time, so the package uses the branch URL when present.

## Exposed Variables

The package exposes the following Vercel system environment variables:

- `VERCEL_ENV`
- `VERCEL_URL`
- `VERCEL_BRANCH_URL`
- `VERCEL_PROJECT_PRODUCTION_URL`

## Benefits

1. Dynamic URL setting at build time
2. Seamless integration with Vercel deployments
3. Simplified access to Vercel system environment variables

## Additional Information

For more details on Vercel's system environment variables, refer to the [official Vercel documentation](https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables).

## License

[MIT](LICENSE)