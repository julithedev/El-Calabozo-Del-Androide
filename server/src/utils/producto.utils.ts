import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verificarProducto(id: number): Promise<boolean> {
  const producto = await prisma.producto.findUnique({
    where: { id },
  });
  return producto !== null;
}
