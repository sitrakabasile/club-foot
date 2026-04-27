import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Maillot Domicile 25/26",
      description: "Le maillot authentique porté par les joueurs au stade.",
      price: 89.99,
      stock: 50,
      category: "Maillots",
      image: "jersey_home.png"
    },
    {
      name: "Maillot Extérieur 25/26",
      description: "Design élégant pour les matchs à l'extérieur.",
      price: 79.99,
      stock: 30,
      category: "Maillots",
      image: "jersey_away.png"
    },
    {
      name: "Veste d'Entraînement",
      description: "Confort et performance pour vos sessions de sport.",
      price: 65.00,
      stock: 20,
      category: "Entraînement",
      image: "training_jacket.png"
    },
    {
      name: "Écharpe Officielle",
      description: "L'accessoire indispensable pour tous les supporters.",
      price: 15.00,
      stock: 100,
      category: "Accessoires",
      image: "scarf.png"
    },
    {
      name: "Ballon de Match Pro",
      description: "Qualité FIFA Pro pour une précision maximale.",
      price: 45.00,
      stock: 15,
      category: "Accessoires",
      image: "ball.png"
    },
    {
      name: "Gourde Club Foot",
      description: "Restez hydraté avec style.",
      price: 12.00,
      stock: 80,
      category: "Accessoires",
      image: "bottle.png"
    }
  ];

  console.log("Seeding shop products...");

  for (const product of products) {
    await prisma.article.create({
      data: product
    });
  }

  console.log("Shop seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
