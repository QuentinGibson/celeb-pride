import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

export async function createPerson(data: any) {
  try {
    const person = await prisma.person.create({
      data,
    });
    return person;
  } catch (e: any) {
    throw new Error("Failed to create Person. Message: " + e.message);
  }
}

export async function getPerson(id: string) {
  try {
    const person = await prisma.person.findUnique({
      where: { id },
      include: {
        category: true,
        pronoun: true,
        flag: true,
      },
    });
    invariant(person, "Could not find person by given id");
    return person;
  } catch (e: any) {
    throw new Error("Failed to read Person. Message: " + e.message);
  }
}

export async function getAllPeople() {
  try {
    const people = await prisma.person.findMany();
    return people;
  } catch (e: any) {
    throw new Error("Failed to get People. Message: " + e.message);
  }
}

export async function getAllPeopleAndFlags() {
  try {
    const people = await prisma.person.findMany({
      include: {
        flag: true,

    }});
    return people;
  } catch (e: any) {
    throw new Error("Failed to get People. Message: " + e.message);
  }
}

export async function deletePerson(id: string) {
  try {
    const person = await prisma.person.delete({ where: { id } });
    return person;
  } catch (e: any) {
    throw new Error("Failed to delete Person. Message: " + e.message);
  }
}

export async function updatePerson(id: string, data: any) {
  try {
    const person = await prisma.person.update({ where: { id }, data });
    return person;
  } catch (e: any) {
    throw new Error("Failed to update Person. Message: " + e.message);
  }
}
