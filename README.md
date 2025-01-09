# vercel-url

[![npm version](https://img.shields.io/npm/v/vercel-url.svg)](https://www.npmjs.com/package/vercel-url)

A helper package that determines the Vercel deployment url `DEPLOYMENT_URL` at build time. Also provides easier access to Vercel system environment variables. Great for replacing `APP_URL`, `NEXT_PUBLIC_URL`, or runtime `getBaseUrl()` functions where applicable.

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
- Provides easier access to Vercel system environment variables

## How it works

This package determines the `DEPLOYMENT_URL` based on the Vercel environment:

- In production: Uses `VERCEL_PROJECT_PRODUCTION_URL`
- In preview: Uses `VERCEL_BRANCH_URL` if available, otherwise `VERCEL_URL`
- In development: Defaults to `http://localhost:3000`

## Caveats

- Preview builds from branch commits may not work as expected because `VERCEL_BRANCH_URL` will be present.
- There's no simple way to detect this at build time, so the package uses the branch URL when present.

## Accessible Variables

The package provides easier access to the following Vercel system environment variables:

- `VERCEL_ENV`
- `VERCEL_URL`
- `VERCEL_BRANCH_URL`
- `VERCEL_PROJECT_PRODUCTION_URL`

Important Note: These variables are not automatically exposed or leaked when you use this package. They are only accessible if you explicitly import and use them in your code. However, be aware that if your application is bundled (e.g., with Webpack or Rollup), unused exports might still be included in the bundle unless proper tree-shaking is implemented.

## Benefits

1. Dynamic URL setting at build time
2. Values can be used both server-side and client-side
3. Seamless integration with Vercel deployments
4. Use Vercel system env variables directly without `process.env`

## Security Considerations

When using this package, keep in mind:

1. The `DEPLOYMENT_URL` is doesn't expose the values used to derive it.
2. If you only import `DEPLOYMENT_URL`, the other Vercel environment variables will not be exposed unless explicitly imported.
3. If you choose to import and use the other variables (`VERCEL_ENV`, `VERCEL_URL`, etc.), ensure you're not unintentionally exposing sensitive information, although these variables are generally safe to use.

## Additional Information

For more details on Vercel's system environment variables, refer to the [official Vercel documentation](https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables).

## License

[MIT](LICENSE)
