// import { config as loadEnv } from "dotenv";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
    setupNodeEvents() {
      // plugins here if needed
    },
  },
  // pass your environment variables from .env to Cypress
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
  },
});
