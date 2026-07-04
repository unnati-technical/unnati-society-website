import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const years = await prisma.leadershipYear.findMany({
    include: {
      sections: {
        include: {
          members: true
        }
      }
    }
  });
  console.log(JSON.stringify(years, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
