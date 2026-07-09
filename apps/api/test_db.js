require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const start = Date.now();
  try {
    const certs = await prisma.certificate.findMany({ take: 1 });
    console.log(`Success! Took ${Date.now() - start}ms`);
  } catch (e) {
    console.error(`Failed! Took ${Date.now() - start}ms`, e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
