// src/index.ts
function getDeploymentUrl() {
  const isVercel = process.env.VERCEL === "1";
  if (!isVercel) {
    const tunnelUrl = process.env.TUNNEL_URL;
    if (tunnelUrl) {
      return tunnelUrl.startsWith("http") ? tunnelUrl : `https://${tunnelUrl}`;
    }
    const port = process.env.PORT || "3000";
    return `http://localhost:${port}`;
  }
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "preview") {
    const branchUrl = process.env.VERCEL_BRANCH_URL;
    if (branchUrl) {
      return `https://${branchUrl}`;
    }
    return `https://${process.env.VERCEL_URL}`;
  }
  if (vercelEnv === "production") {
    const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (productionUrl) {
      return `https://${productionUrl}`;
    }
    return `https://${process.env.VERCEL_URL}`;
  }
  return `https://${process.env.VERCEL_URL || "localhost:3000"}`;
}
var DEPLOYMENT_URL = getDeploymentUrl();
var VERCEL_ENV = process.env.VERCEL_ENV;
var VERCEL_URL = process.env.VERCEL_URL;
var VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL;
var VERCEL_PROJECT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export {
  VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_ENV,
  VERCEL_BRANCH_URL,
  DEPLOYMENT_URL
};
