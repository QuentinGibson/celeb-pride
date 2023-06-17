import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
export async function createFlag(data: any) {
  try {
    const flag = await prisma.flag.create({
      data,
    });
    return flag;
  } catch (e: any) {
    throw new Error("Failed to create Flag. Message: " + e.message);
  }
}

export async function getFlag(id: string) {
  try {
    const flag = await prisma.flag.findUnique({ where: { id } });
    invariant(flag, "Can't a flag with this ID");
    return flag;
  } catch (e: any) {
    throw new Error("Failed to read Flag. Message: " + e.message);
  }
}

export async function getAllFlag() {
  try {
    const flag = await prisma.flag.findMany();
    return flag;
  } catch (e: any) {
    throw new Error("Failed to get Flag. Message: " + e.message);
  }
}

export async function deleteFlag(id: string) {
  try {
    const flag = await prisma.flag.delete({ where: { id } });
    return flag;
  } catch (e: any) {
    throw new Error("Failed to delete Flag. Message: " + e.message);
  }
}

export async function updateFlag(id: string, data: any) {
  try {
    const flag = await prisma.flag.update({ where: { id }, data });
    return flag;
  } catch (e: any) {
    throw new Error("Failed to update Flag. Message: " + e.message);
  }
}
