/*
  Warnings:

  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('Available', 'Out_of_stock');

-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('pending', 'shipped');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "contact_info" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "shopKeeper_id" INTEGER NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopKeeper" (
    "shopkeeper_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_info" INTEGER NOT NULL,
    "managed_shops" INTEGER NOT NULL,

    CONSTRAINT "ShopKeeper_pkey" PRIMARY KEY ("shopkeeper_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "pid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT[],
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "status" "Availability" NOT NULL,
    "shopId" INTEGER NOT NULL,
    "orderOrder_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Order_Status" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_shopKeeper_id_fkey" FOREIGN KEY ("shopKeeper_id") REFERENCES "ShopKeeper"("shopkeeper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderOrder_id_fkey" FOREIGN KEY ("orderOrder_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
