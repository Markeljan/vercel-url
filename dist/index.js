// src/index.ts
var {
  VERCEL_ENV,
  VERCEL_URL,
  VERCEL_BRANCH_URL,
  VERCEL_PROJECT_PRODUCTION_URL
} = process.env;
var DEPLOYMENT_URL = (() => {
  switch (VERCEL_ENV) {
    case "production":
      return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
    case "preview":
      return `https://${VERCEL_BRANCH_URL || VERCEL_URL}`;
    default:
      return `http://localhost:${process.env.PORT || 3000}`;
  }
})();
export {
  VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_ENV,
  VERCEL_BRANCH_URL,
  DEPLOYMENT_URL
};
