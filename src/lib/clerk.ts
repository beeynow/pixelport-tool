// Clerk configuration
export const CLERK_PUBLISHABLE_KEY = "pk_test_cGlja2VkLWJhdC0xMy5jbGVyay5hY2NvdW50cy5kZXYk";

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: "free",
  PREMIUM: "premium",
} as const;

// Conversion limits
export const CONVERSION_LIMITS = {
  FREE: {
    daily: 10,
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  PREMIUM: {
    daily: Infinity,
    fileSize: 100 * 1024 * 1024, // 100MB
  },
} as const;
