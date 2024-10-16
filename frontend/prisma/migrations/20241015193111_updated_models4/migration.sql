/*
  Warnings:

  - Added the required column `password` to the `ShopKeeper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Order_Status" ADD VALUE 'cancelled';
ALTER TYPE "Order_Status" ADD VALUE 'delivered';
ALTER TYPE "Order_Status" ADD VALUE 'returned';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "total_amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ShopKeeper" ADD COLUMN     "password" TEXT NOT NULL;
