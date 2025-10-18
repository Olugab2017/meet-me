import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your database schema

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,

  },
  trustedOrigins: ["http://localhost:3000",
    "http://localhost:3001"
  ],

  database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          ...schema,
        }

  }),
});