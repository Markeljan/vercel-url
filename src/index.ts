/**
 * A utility to get the current deployment URL
 * Works in development and Vercel environments
 */

/**
 * Returns the current deployment URL based on environment
 * - Development: TUNNEL_URL if set, otherwise localhost with port
 * - Vercel Preview: Branch/preview URL
 * - Vercel Production: Production URL
 */
function getDeploymentUrl(): string {
  // Check if running on Vercel
  const isVercel = process.env.VERCEL === "1";

  if (!isVercel) {
    // Development environment
    // Check for TUNNEL_URL first (for tunnels/proxies during development)
    const tunnelUrl = process.env.TUNNEL_URL;
    if (tunnelUrl) {
      // Ensure it has a protocol
      return tunnelUrl.startsWith("http") ? tunnelUrl : `https://${tunnelUrl}`;
    }
    // Fallback to localhost
    const port = process.env.PORT || "3000";
    return `http://localhost:${port}`;
  }

  // Vercel environment
  const vercelEnv = process.env.VERCEL_ENV;

  // For preview deployments, use the branch URL if available
  if (vercelEnv === "preview") {
    const branchUrl = process.env.VERCEL_BRANCH_URL;
    if (branchUrl) {
      return `https://${branchUrl}`;
    }
    // Fallback to the general deployment URL
    return `https://${process.env.VERCEL_URL}`;
  }

  // For production, use the production URL if available
  if (vercelEnv === "production") {
    const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (productionUrl) {
      return `https://${productionUrl}`;
    }
    // Fallback to the general deployment URL
    return `https://${process.env.VERCEL_URL}`;
  }

  // Default fallback
  return `https://${process.env.VERCEL_URL || "localhost:3000"}`;
}

/**
 * The current deployment URL as a string
 */
export const DEPLOYMENT_URL = getDeploymentUrl();

/**
 * Vercel environment variables for easier access
 * These are the system environment variables provided by Vercel
 */
export const VERCEL_ENV = process.env.VERCEL_ENV;
export const VERCEL_URL = process.env.VERCEL_URL;
export const VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL;
export const VERCEL_PROJECT_PRODUCTION_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL;
