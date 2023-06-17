import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
export async function createCategory(data: any) {
  try {
    const category = await prisma.category.create({
      data,
    });
    return category;
  } catch (e: any) {
    throw new Error("Failed to create Category. Message: " + e.message);
  }
}

export async function getCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    invariant(category, "No category found with this id");
    return category;
  } catch (e: any) {
    throw new Error("Failed to read Category. Message: " + e.message);
  }
}

export async function getAllCategory() {
  try {
    const category = await prisma.category.findMany();
    return category;
  } catch (e: any) {
    throw new Error("Failed to get Category. Message: " + e.message);
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.delete({ where: { id } });
    return category;
  } catch (e: any) {
    throw new Error("Failed to delete Category. Message: " + e.message);
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const category = await prisma.category.update({ where: { id }, data });
    return category;
  } catch (e: any) {
    throw new Error("Failed to update Category. Message: " + e.message);
  }
}
