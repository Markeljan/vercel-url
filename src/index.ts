/**
 * A utility to get the current deployment URL
 * Works in development and Vercel environments
 */

type EnvValue = string | undefined;
type EnvReader = () => EnvValue;

type ImportMetaWithEnv = ImportMeta & {
  env?: Record<string, EnvValue>;
};

type VercelEnvName =
  | "VERCEL_ENV"
  | "VERCEL_TARGET_ENV"
  | "VERCEL_URL"
  | "VERCEL_BRANCH_URL"
  | "VERCEL_PROJECT_PRODUCTION_URL";

type VercelContext = {
  branchUrl: EnvValue;
  env: EnvValue;
  productionUrl: EnvValue;
  targetEnv: EnvValue;
  url: EnvValue;
};

const importMetaEnv = (import.meta as ImportMetaWithEnv).env;
const PROTOCOL_RE = /^https?:\/\//i;

const FRAMEWORK_VERCEL_ENV_READERS: Record<
  VercelEnvName,
  readonly EnvReader[]
> = {
  VERCEL_ENV: [
    () =>
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.NUXT_ENV_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.REACT_APP_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.GATSBY_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_ENV,
    () =>
      typeof process !== "undefined" ? process.env.VITE_VERCEL_ENV : undefined,
    () => importMetaEnv?.VITE_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.PUBLIC_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.VUE_APP_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.REDWOOD_ENV_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.SANITY_STUDIO_VERCEL_ENV
        : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_ENV,
  ],
  VERCEL_TARGET_ENV: [
    () =>
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.NUXT_ENV_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.REACT_APP_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.GATSBY_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.VITE_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.VITE_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.PUBLIC_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.VUE_APP_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.REDWOOD_ENV_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_TARGET_ENV,
    () =>
      typeof process !== "undefined"
        ? process.env.SANITY_STUDIO_VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_TARGET_ENV,
  ],
  VERCEL_URL: [
    () =>
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.NUXT_ENV_VERCEL_URL
        : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REACT_APP_VERCEL_URL
        : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.GATSBY_VERCEL_URL
        : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_URL,
    () =>
      typeof process !== "undefined" ? process.env.VITE_VERCEL_URL : undefined,
    () => importMetaEnv?.VITE_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.PUBLIC_VERCEL_URL
        : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.VUE_APP_VERCEL_URL
        : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REDWOOD_ENV_VERCEL_URL
        : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.SANITY_STUDIO_VERCEL_URL
        : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_URL,
  ],
  VERCEL_BRANCH_URL: [
    () =>
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.NUXT_ENV_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REACT_APP_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.GATSBY_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.VITE_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.VITE_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.PUBLIC_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.VUE_APP_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REDWOOD_ENV_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_BRANCH_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.SANITY_STUDIO_VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_BRANCH_URL,
  ],
  VERCEL_PROJECT_PRODUCTION_URL: [
    () =>
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REACT_APP_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.GATSBY_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.VITE_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.VUE_APP_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL,
    () =>
      typeof process !== "undefined"
        ? process.env.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL,
  ],
};

const SYSTEM_VERCEL_ENV_READERS: Record<VercelEnvName, readonly EnvReader[]> = {
  VERCEL_ENV: [
    () => (typeof process !== "undefined" ? process.env.VERCEL_ENV : undefined),
    () => importMetaEnv?.VERCEL_ENV,
  ],
  VERCEL_TARGET_ENV: [
    () =>
      typeof process !== "undefined"
        ? process.env.VERCEL_TARGET_ENV
        : undefined,
    () => importMetaEnv?.VERCEL_TARGET_ENV,
  ],
  VERCEL_URL: [
    () => (typeof process !== "undefined" ? process.env.VERCEL_URL : undefined),
    () => importMetaEnv?.VERCEL_URL,
  ],
  VERCEL_BRANCH_URL: [
    () =>
      typeof process !== "undefined"
        ? process.env.VERCEL_BRANCH_URL
        : undefined,
    () => importMetaEnv?.VERCEL_BRANCH_URL,
  ],
  VERCEL_PROJECT_PRODUCTION_URL: [
    () =>
      typeof process !== "undefined"
        ? process.env.VERCEL_PROJECT_PRODUCTION_URL
        : undefined,
    () => importMetaEnv?.VERCEL_PROJECT_PRODUCTION_URL,
  ],
};

const TUNNEL_URL_READERS: readonly EnvReader[] = [
  () => (typeof process !== "undefined" ? process.env.TUNNEL_URL : undefined),
  () =>
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_TUNNEL_URL
      : undefined,
  () => importMetaEnv?.NEXT_PUBLIC_TUNNEL_URL,
  () =>
    typeof process !== "undefined" ? process.env.VITE_TUNNEL_URL : undefined,
  () => importMetaEnv?.VITE_TUNNEL_URL,
  () =>
    typeof process !== "undefined" ? process.env.PUBLIC_TUNNEL_URL : undefined,
  () => importMetaEnv?.PUBLIC_TUNNEL_URL,
];

function readFirstEnv(...groups: Array<readonly EnvReader[]>): EnvValue {
  for (const group of groups) {
    for (const read of group) {
      const value = read();

      if (value) {
        return value;
      }
    }
  }

  return undefined;
}

function addProtocol(
  url: string,
  protocol: "http" | "https" = "https"
): string {
  return PROTOCOL_RE.test(url) ? url : `${protocol}://${url}`;
}

/**
 * Framework-prefixed Vercel env vars are the only values exposed to client bundles
 * in most frameworks (e.g. NEXT_PUBLIC_, VITE_, PUBLIC_).
 *
 * Prefer these first so DEPLOYMENT_URL resolves consistently on both server and client.
 */
function getFrameworkOrSystemEnv(name: VercelEnvName): EnvValue {
  return readFirstEnv(
    FRAMEWORK_VERCEL_ENV_READERS[name],
    SYSTEM_VERCEL_ENV_READERS[name]
  );
}

function getVercelContext(): VercelContext {
  return {
    branchUrl: getFrameworkOrSystemEnv("VERCEL_BRANCH_URL"),
    env: getFrameworkOrSystemEnv("VERCEL_ENV"),
    productionUrl: getFrameworkOrSystemEnv("VERCEL_PROJECT_PRODUCTION_URL"),
    targetEnv: getFrameworkOrSystemEnv("VERCEL_TARGET_ENV"),
    url: getFrameworkOrSystemEnv("VERCEL_URL"),
  };
}

function isVercelEnvironment(context: VercelContext): boolean {
  return (
    Boolean(
      context.env ||
        context.targetEnv ||
        context.url ||
        context.branchUrl ||
        context.productionUrl
    ) || (typeof process !== "undefined" ? process.env.VERCEL === "1" : false)
  );
}

function getDevelopmentUrl(): string {
  const tunnelUrl = readFirstEnv(TUNNEL_URL_READERS);

  if (tunnelUrl) {
    return addProtocol(tunnelUrl);
  }

  const port =
    (typeof process !== "undefined" ? process.env.PORT : undefined) || "3000";

  return `http://localhost:${port}`;
}

function getVercelDeploymentUrl(context: VercelContext): string {
  const effectiveEnv = context.env || context.targetEnv;

  if (effectiveEnv === "preview") {
    return addProtocol(context.branchUrl || context.url || "localhost:3000");
  }

  if (effectiveEnv === "production") {
    return addProtocol(
      context.productionUrl || context.url || "localhost:3000"
    );
  }

  return addProtocol(context.url || "localhost:3000");
}

/**
 * Returns the current deployment URL based on environment
 * - Development: TUNNEL_URL or NEXT_PUBLIC_TUNNEL_URL if set, otherwise localhost with port
 * - Vercel Preview: Branch/preview URL
 * - Vercel Production: Production URL
 */
function getDeploymentUrl(): string {
  const context = getVercelContext();

  if (!isVercelEnvironment(context)) {
    return getDevelopmentUrl();
  }

  return getVercelDeploymentUrl(context);
}

/**
 * The current deployment URL as a string
 */
export const DEPLOYMENT_URL = getDeploymentUrl();

/**
 * Vercel environment variables for easier access
 * These are the system environment variables provided by Vercel
 */
export const VERCEL_ENV =
  typeof process !== "undefined" ? process.env.VERCEL_ENV : undefined;
export const VERCEL_URL =
  typeof process !== "undefined" ? process.env.VERCEL_URL : undefined;
export const VERCEL_BRANCH_URL =
  typeof process !== "undefined" ? process.env.VERCEL_BRANCH_URL : undefined;
export const VERCEL_PROJECT_PRODUCTION_URL =
  typeof process !== "undefined"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : undefined;
