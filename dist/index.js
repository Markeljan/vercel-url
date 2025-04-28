// src/index.ts
function getDeploymentUrl() {
  const isVercel = process.env.VERCEL === "1";
  if (!isVercel) {
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
export {
  DEPLOYMENT_URL
};
