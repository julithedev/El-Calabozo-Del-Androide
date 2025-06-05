-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_producto_key" ON "Producto"("producto");
