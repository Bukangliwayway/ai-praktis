/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-trial_owner:MSs3WRTBYra0@ep-long-feather-a1ldmbqs-pooler.ap-southeast-1.aws.neon.tech/ai-trial?sslmode=require",
  },
};
