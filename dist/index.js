// src/index.ts
var importMetaEnv = import.meta.env;
var PROTOCOL_RE = /^https?:\/\//i;
var FRAMEWORK_VERCEL_ENV_READERS = {
  VERCEL_ENV: [
    () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_VERCEL_ENV : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.NUXT_ENV_VERCEL_ENV : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.REACT_APP_VERCEL_ENV : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.GATSBY_VERCEL_ENV : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.VITE_VERCEL_ENV : undefined,
    () => importMetaEnv?.VITE_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.PUBLIC_VERCEL_ENV : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.VUE_APP_VERCEL_ENV : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.REDWOOD_ENV_VERCEL_ENV : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_ENV,
    () => typeof process !== "undefined" ? process.env.SANITY_STUDIO_VERCEL_ENV : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_ENV
  ],
  VERCEL_TARGET_ENV: [
    () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.NUXT_ENV_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.REACT_APP_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.GATSBY_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.VITE_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.VITE_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.PUBLIC_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.VUE_APP_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.REDWOOD_ENV_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_TARGET_ENV,
    () => typeof process !== "undefined" ? process.env.SANITY_STUDIO_VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_TARGET_ENV
  ],
  VERCEL_URL: [
    () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_VERCEL_URL : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.NUXT_ENV_VERCEL_URL : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.REACT_APP_VERCEL_URL : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.GATSBY_VERCEL_URL : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.VITE_VERCEL_URL : undefined,
    () => importMetaEnv?.VITE_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.PUBLIC_VERCEL_URL : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.VUE_APP_VERCEL_URL : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.REDWOOD_ENV_VERCEL_URL : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_URL,
    () => typeof process !== "undefined" ? process.env.SANITY_STUDIO_VERCEL_URL : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_URL
  ],
  VERCEL_BRANCH_URL: [
    () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.NUXT_ENV_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.REACT_APP_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.GATSBY_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.VITE_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.VITE_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.PUBLIC_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.VUE_APP_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.REDWOOD_ENV_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_BRANCH_URL,
    () => typeof process !== "undefined" ? process.env.SANITY_STUDIO_VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_BRANCH_URL
  ],
  VERCEL_PROJECT_PRODUCTION_URL: [
    () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.REACT_APP_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.REACT_APP_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.GATSBY_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.GATSBY_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.VITE_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.VUE_APP_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.VUE_APP_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL,
    () => typeof process !== "undefined" ? process.env.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL
  ]
};
var SYSTEM_VERCEL_ENV_READERS = {
  VERCEL_ENV: [
    () => typeof process !== "undefined" ? process.env.VERCEL_ENV : undefined,
    () => importMetaEnv?.VERCEL_ENV
  ],
  VERCEL_TARGET_ENV: [
    () => typeof process !== "undefined" ? process.env.VERCEL_TARGET_ENV : undefined,
    () => importMetaEnv?.VERCEL_TARGET_ENV
  ],
  VERCEL_URL: [
    () => typeof process !== "undefined" ? process.env.VERCEL_URL : undefined,
    () => importMetaEnv?.VERCEL_URL
  ],
  VERCEL_BRANCH_URL: [
    () => typeof process !== "undefined" ? process.env.VERCEL_BRANCH_URL : undefined,
    () => importMetaEnv?.VERCEL_BRANCH_URL
  ],
  VERCEL_PROJECT_PRODUCTION_URL: [
    () => typeof process !== "undefined" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : undefined,
    () => importMetaEnv?.VERCEL_PROJECT_PRODUCTION_URL
  ]
};
var TUNNEL_URL_READERS = [
  () => typeof process !== "undefined" ? process.env.TUNNEL_URL : undefined,
  () => typeof process !== "undefined" ? process.env.NEXT_PUBLIC_TUNNEL_URL : undefined,
  () => importMetaEnv?.NEXT_PUBLIC_TUNNEL_URL,
  () => typeof process !== "undefined" ? process.env.VITE_TUNNEL_URL : undefined,
  () => importMetaEnv?.VITE_TUNNEL_URL,
  () => typeof process !== "undefined" ? process.env.PUBLIC_TUNNEL_URL : undefined,
  () => importMetaEnv?.PUBLIC_TUNNEL_URL
];
function readFirstEnv(...groups) {
  for (const group of groups) {
    for (const read of group) {
      const value = read();
      if (value) {
        return value;
      }
    }
  }
  return;
}
function addProtocol(url, protocol = "https") {
  return PROTOCOL_RE.test(url) ? url : `${protocol}://${url}`;
}
function getFrameworkOrSystemEnv(name) {
  return readFirstEnv(FRAMEWORK_VERCEL_ENV_READERS[name], SYSTEM_VERCEL_ENV_READERS[name]);
}
function getVercelContext() {
  return {
    branchUrl: getFrameworkOrSystemEnv("VERCEL_BRANCH_URL"),
    env: getFrameworkOrSystemEnv("VERCEL_ENV"),
    productionUrl: getFrameworkOrSystemEnv("VERCEL_PROJECT_PRODUCTION_URL"),
    targetEnv: getFrameworkOrSystemEnv("VERCEL_TARGET_ENV"),
    url: getFrameworkOrSystemEnv("VERCEL_URL")
  };
}
function isVercelEnvironment(context) {
  return Boolean(context.env || context.targetEnv || context.url || context.branchUrl || context.productionUrl) || (typeof process !== "undefined" ? process.env.VERCEL === "1" : false);
}
function getDevelopmentUrl() {
  const tunnelUrl = readFirstEnv(TUNNEL_URL_READERS);
  if (tunnelUrl) {
    return addProtocol(tunnelUrl);
  }
  const port = (typeof process !== "undefined" ? process.env.PORT : undefined) || "3000";
  return `http://localhost:${port}`;
}
function getVercelDeploymentUrl(context) {
  const effectiveEnv = context.env || context.targetEnv;
  if (effectiveEnv === "preview") {
    return addProtocol(context.branchUrl || context.url || "localhost:3000");
  }
  if (effectiveEnv === "production") {
    return addProtocol(context.productionUrl || context.url || "localhost:3000");
  }
  return addProtocol(context.url || "localhost:3000");
}
function getDeploymentUrl() {
  const context = getVercelContext();
  if (!isVercelEnvironment(context)) {
    return getDevelopmentUrl();
  }
  return getVercelDeploymentUrl(context);
}
var DEPLOYMENT_URL = getDeploymentUrl();
var VERCEL_ENV = typeof process !== "undefined" ? process.env.VERCEL_ENV : undefined;
var VERCEL_URL = typeof process !== "undefined" ? process.env.VERCEL_URL : undefined;
var VERCEL_BRANCH_URL = typeof process !== "undefined" ? process.env.VERCEL_BRANCH_URL : undefined;
var VERCEL_PROJECT_PRODUCTION_URL = typeof process !== "undefined" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : undefined;
export {
  VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_ENV,
  VERCEL_BRANCH_URL,
  DEPLOYMENT_URL
};
