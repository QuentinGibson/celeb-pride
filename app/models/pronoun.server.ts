import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
export async function createPronoun(data: any) {
  try {
    const pronoun = await prisma.pronoun.create({
      data,
    });
    return pronoun;
  } catch (e: any) {
    throw new Error("Failed to create Pronoun. Message: " + e.message);
  }
}

export async function getPronoun(id: string) {
  try {
    const pronoun = await prisma.pronoun.findUnique({ where: { id } });
    invariant(pronoun, "Failed to find pronoun with that Id.");
    return pronoun;
  } catch (e: any) {
    throw new Error("Failed to read Pronoun. Message: " + e.message);
  }
}

export async function getAllPronouns() {
  try {
    const pronouns = await prisma.pronoun.findMany();
    return pronouns;
  } catch (e: any) {
    throw new Error("Failed to get Pronouns. Message: " + e.message);
  }
}

export async function deletePronoun(id: string) {
  try {
    const pronoun = await prisma.pronoun.delete({ where: { id } });
    return pronoun;
  } catch (e: any) {
    throw new Error("Failed to delete Pronoun. Message: " + e.message);
  }
}

export async function updatePronoun(id: string, data: any) {
  try {
    const pronoun = await prisma.pronoun.update({ where: { id }, data });
    return pronoun;
  } catch (e: any) {
    throw new Error("Failed to update Pronoun. Message: " + e.message);
  }
}
