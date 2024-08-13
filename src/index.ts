export const {
    VERCEL_ENV,
    VERCEL_URL,
    VERCEL_BRANCH_URL,
    VERCEL_PROJECT_PRODUCTION_URL,
} = process.env;

export const DEPLOYMENT_URL = (() => {
    switch (VERCEL_ENV) {
        case "production":
            return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
        case "preview":
            return `https://${VERCEL_BRANCH_URL || VERCEL_URL}`;
        default:
            return "http://localhost:3000";
    }
})();