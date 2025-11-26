import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from available env files - check root first, then package
const rootDir = resolve(__dirname, "..", "..", "..");
const packageDir = resolve(__dirname, "..");

const envFiles = [
    // Check root directory first (global .env files)
    ...[".env.local", ".env.production", ".env.development", ".env"].map(
        (file) => resolve(rootDir, file),
    ),
    // Then check package directory
    ...[".env.local", ".env.production", ".env.development", ".env"].map(
        (file) => resolve(packageDir, file),
    ),
];

const existingEnvFile = envFiles.find((file) => existsSync(file));

if (existingEnvFile) {
    config({ path: existingEnvFile });
} else {
    // Fallback to default dotenv behavior
    config();
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        // biome-ignore lint: Forbidden non-null assertion.
        url: process.env.POSTGRES_URL!,
    },
});
