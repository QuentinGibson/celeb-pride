import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const movieCategory = await prisma.category.create({
    data: {
      name: "Actor/Actress",
    },
  });

  await prisma.category.create({
    data: {
      name: "Book",
    },
  });

  await prisma.category.create({
    data: {
      name: "Anime",
    },
  });

  await prisma.flag.create({
    data: {
      name: "Lesbian Pride Flag",
      image: "/flags/Lesbian_Pride_Flag.avif",
    },
  });

  const gayFlag = await prisma.flag.create({
    data: {
      name: "Trans-Inclusive Gay Men's Pride Flag ",
      image: "/flags/Trans_Gay_Pride_Flag.avif",
    },
  });

  const malePronoun = await prisma.pronoun.create({
    data: {
      name: "He/Him",
    },
  });

  await prisma.pronoun.create({
    data: {
      name: "She/Her",
    },
  });

  await prisma.pronoun.create({
    data: {
      name: "They/Them",
    },
  });

  await prisma.person.create({
    data: {
      name: "Tyler the Creator",
      image: "/person/Tyler_the_Creator.jpg",
      age: 32,
      pronounId: malePronoun.id,
      flagId: gayFlag.id,
      categoryId: movieCategory.id,
    },
  });

  await prisma.person.create({
    data: {
      name: "Frank Ocean",
      image: "/person/Frank_Ocean.jpg",
      age: 35,
      pronounId: malePronoun.id,
      flagId: gayFlag.id,
      categoryId: movieCategory.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
