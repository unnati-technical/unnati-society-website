import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const volunteers = await prisma.volunteerApplication.findMany();
  console.log(JSON.stringify(volunteers, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
