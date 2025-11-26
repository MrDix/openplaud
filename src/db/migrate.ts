import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

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

const existingEnvFile = envFiles.find(existsSync);

if (existingEnvFile) {
    config({ path: existingEnvFile });
} else {
    // Fallback to default dotenv behavior
    config();
}

const runMigrate = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }

    const connection = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(connection);

    console.log("⏳ Running migrations...");

    const start = Date.now();
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    const end = Date.now();

    console.log("✅ Migrations completed in", end - start, "ms");
    process.exit(0);
};

runMigrate().catch((err) => {
    console.error("❌ Migration failed");
    console.error(err);
    process.exit(1);
});
