/*
  Warnings:

  - You are about to drop the column `orderOrder_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderOrder_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderOrder_id";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "OrderId" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
