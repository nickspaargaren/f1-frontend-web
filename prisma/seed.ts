import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const circuits = [
    {
      name: "Bahrain GP",
      description: "Bahrein, Sakhir",
      location: "Unknown",
      flag: "bhr",
    },
    {
      name: "Azerbaijan GP",
      description: "Baku City Circuit",
      location: "Unknown",
      flag: "aze",
    },
    {
      name: "Hungarian GP",
      description: "Hungaroring, Budapest",
      location: "Unknown",
      flag: "hun",
    },
    {
      name: "British GP",
      description: "Circuit Silverstone",
      location: "Unknown",
      flag: "gbr",
    },
    {
      name: "Brazilian GP",
      description: "Interlagos, São Paulo",
      location: "Unknown",
      flag: "bra",
    },
    {
      name: "Emilia Romagna GP",
      description: "Imola",
      location: "Unknown",
      flag: "ita",
    },
    {
      name: "Spanish GP",
      description: "Barcelona",
      location: "Unknown",
      flag: "esp",
    },
    {
      name: "Dutch GP",
      description: "Circuit Zandvoort",
      location: "Unknown",
      flag: "nld",
    },
    {
      name: "Monaco GP",
      description: "Monte Carlo",
      location: "Unknown",
      flag: "mco",
    },
    {
      name: "Italian GP",
      description: "Monza",
      location: "Unknown",
      flag: "ita",
    },
    {
      name: "Russian GP",
      description: "Sochi Autodrom",
      location: "Unknown",
      flag: "rus",
    },
    {
      name: "Abu Dhabi GP",
      description: "Yas Marina Circuit",
      location: "Unknown",
      flag: "are",
    },
    {
      name: "French GP",
      description: "Circuit Paul Ricard, Le Castellet",
      location: "Unknown",
      flag: "fra",
    },
    {
      name: "Belgian GP",
      description: "Spa-Francorchamps",
      location: "Unknown",
      flag: "bel",
    },
    {
      name: "Mexican GP",
      description: "Autodromo Hermanos Rodriguez",
      location: "Unknown",
      flag: "mex",
    },
    {
      name: "Portuguese GP",
      description: "Portimão",
      location: "Unknown",
      flag: "por",
    },
    {
      name: "Austrian GP",
      description: "Red Bull Ring, Spielberg",
      location: "Unknown",
      flag: "aut",
    },
    {
      name: "United States GP",
      description: "Austin, Texas",
      location: "Unknown",
      flag: "usa",
    },
    {
      name: "Saudi Arabian GP",
      description: "Jeddah Street Circuit",
      location: "Unknown",
      flag: "sau",
    },
    {
      name: "Australian GP",
      description: "Melbourne",
      location: "Melbourne",
      flag: "au",
    },
    {
      name: "Japanese GP",
      description: "Suzuka Circuit",
      location: "Japan",
      flag: "jap",
    },
    {
      name: "Chinese GP",
      description: "Shanghai",
      location: "China",
      flag: "chi",
    },
    {
      name: "Singapore GP",
      description: "Marina Bay Street Circuit",
      location: "Unknown",
      flag: "sgp",
    },
    {
      name: "Canadian GP",
      description: "Gilles Villeneuve",
      location: "Montreal",
      flag: "can",
    },
    {
      name: "Miami GP",
      description: "Miami International Autodrome",
      location: "Unknown",
      flag: "usa",
    },
  ];

  const newCircuits = await prisma.circuits.createMany({
    data: circuits,
    skipDuplicates: true,
  });

  console.log(`Added ${newCircuits.count} circuits`);

  const times = [
    {
      time: "01:17.571",
      gamertag: "CSI-SNIPER",
      circuitId: 1,
    },
    {
      time: "01:16.126",
      gamertag: "nickspaargaren25",
      circuitId: 2,
    },
    {
      time: "01:08.404",
      gamertag: "CSI-SNIPER",
      circuitId: 3,
    },
    {
      time: "01:10.213",
      gamertag: "nickspaargaren25",
      circuitId: 3,
    },
  ];

  const newTimes = await prisma.times.createMany({
    data: times,
    skipDuplicates: true,
  });

  console.log(`Added ${newTimes.count} times`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
