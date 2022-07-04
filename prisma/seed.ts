import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const circuits = [
    {
      name: "Bahrain GP",
      description: "Bahrein, Sakhir",
      location: "Unknown",
      flag: "bhr",
      winner: "",
    },
    {
      name: "Azerbaijan GP",
      description: "Baku City Circuit",
      location: "Unknown",
      flag: "aze",
      winner: "",
    },
    {
      name: "Hungarian GP",
      description: "Hungaroring, Budapest",
      location: "Unknown",
      flag: "hun",
      winner: "",
    },
    {
      name: "British GP",
      description: "Circuit Silverstone",
      location: "Unknown",
      flag: "gbr",
      winner: "",
    },
    {
      name: "Brazilian GP",
      description: "Interlagos, São Paulo",
      location: "Unknown",
      flag: "bra",
      winner: "",
    },
    {
      name: "Emilia Romagna GP",
      description: "Imola",
      location: "Unknown",
      flag: "ita",
      winner: "",
    },
    {
      name: "Spanish GP",
      description: "Barcelona",
      location: "Unknown",
      flag: "esp",
      winner: "",
    },
    {
      name: "Dutch GP",
      description: "Circuit Zandvoort",
      location: "Unknown",
      flag: "nld",
      winner: "",
    },
    {
      name: "Monaco GP",
      description: "Monte Carlo",
      location: "Unknown",
      flag: "mco",
      winner: "",
    },
    {
      name: "Italian GP",
      description: "Monza",
      location: "Unknown",
      flag: "ita",
      winner: "",
    },
    {
      name: "Russian GP",
      description: "Sochi Autodrom",
      location: "Unknown",
      flag: "rus",
      winner: "",
    },
    {
      name: "Abu Dhabi GP",
      description: "Yas Marina Circuit",
      location: "Unknown",
      flag: "are",
      winner: "",
    },
    {
      name: "French GP",
      description: "Circuit Paul Ricard, Le Castellet",
      location: "Unknown",
      flag: "fra",
      winner: "",
    },
    {
      name: "Belgian GP",
      description: "Spa-Francorchamps",
      location: "Unknown",
      flag: "bel",
      winner: "",
    },
    {
      name: "Mexican GP",
      description: "Autodromo Hermanos Rodriguez",
      location: "Unknown",
      flag: "mex",
      winner: "",
    },
    {
      name: "Portuguese GP",
      description: "Portimão",
      location: "Unknown",
      flag: "por",
      winner: "CSI-SNIPER",
    },
    {
      name: "Austrian GP",
      description: "Red Bull Ring, Spielberg",
      location: "Unknown",
      flag: "aut",
      winner: "nickspaargaren25",
    },
    {
      name: "United States GP",
      description: "Austin, Texas",
      location: "Unknown",
      flag: "usa",
      winner: "",
    },
    {
      name: "Saudi Arabian GP",
      description: "Jeddah Street Circuit",
      location: "Unknown",
      flag: "sau",
      winner: "",
    },
    {
      name: "Australian GP",
      description: "Melbourne",
      location: "Melbourne",
      flag: "au",
      winner: "",
    },
    {
      name: "Japanese GP",
      description: "Suzuka Circuit",
      location: "Japan",
      flag: "jap",
      winner: "",
    },
    {
      name: "Chinese GP",
      description: "Shanghai",
      location: "China",
      flag: "chi",
      winner: "",
    },
    {
      name: "Singapore GP",
      description: "Marina Bay Street Circuit",
      location: "Unknown",
      flag: "sgp",
      winner: "",
    },
    {
      name: "Canadian GP",
      description: "Gilles Villeneuve",
      location: "Montreal",
      flag: "can",
      winner: "",
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
