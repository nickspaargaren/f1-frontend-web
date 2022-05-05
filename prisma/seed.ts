import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const circuits = [
    {
      name: 'Abu Dhabi GP',
      description: 'test',
      location: 'test',
      flag: 'test',
      winner: 'test',
    },
    {
      name: 'Australian GP',
      description: 'test',
      location: 'test',
      flag: 'test',
      winner: 'test',
    },
    {
      name: 'Zandvoort',
      description: 'test',
      location: 'test',
      flag: 'test',
      winner: 'test',
    },
  ];

  const newCircuits = await prisma.circuits.createMany({
    data: circuits,
    skipDuplicates: true,
  });

  console.log({ newCircuits });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
