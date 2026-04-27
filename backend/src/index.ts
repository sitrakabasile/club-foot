import app from "./app";
import { prisma } from "./lib/prisma";

/**
 * Entry point for the Next-Gen Football Hub Backend API.
 */

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connection established.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
