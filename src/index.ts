

export const {
    NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_VERCEL_BRANCH_URL,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
} = process.env;

export const DEPLOYMENT_URL = (() => {
    switch (NEXT_PUBLIC_VERCEL_ENV) {
        case "production":
            return `https://${NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
        case "preview":
            return `https://${NEXT_PUBLIC_VERCEL_BRANCH_URL || NEXT_PUBLIC_VERCEL_URL}`;
        default:
            return "http://localhost:3000";
    }
})();