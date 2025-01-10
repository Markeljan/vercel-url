/**
 * Vercel system environment variables. These are only available if enabled in your project settings:
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
 */
export declare const VERCEL_ENV:
  | "production"
  | "preview"
  | "development"
  | undefined;

/**
 * The preview URL of your Vercel deployment
 * @example "preview-abc123.vercel.app"
 */
export declare const VERCEL_URL: string | undefined;

/**
 * The URL of the branch deployment if deployed from a branch
 * @example "feature-branch-459nsa.vercel.app"
 */
export declare const VERCEL_BRANCH_URL: string | undefined;

/**
 * The production URL of your Vercel project
 * @example "example.vercel.app"
 */
export declare const VERCEL_PROJECT_PRODUCTION_URL: string | undefined;

/**
 * The full deployment URL determined at build time based on the environment:
 * - Production: Uses `https://${VERCEL_PROJECT_PRODUCTION_URL}`
 * - Preview: Uses `https://${VERCEL_BRANCH_URL || VERCEL_URL}`
 * - Development: Uses `http://localhost:${process.env.PORT || 3000}`
 * @example "https://example.vercel.app"
 */
export declare const DEPLOYMENT_URL: string;
