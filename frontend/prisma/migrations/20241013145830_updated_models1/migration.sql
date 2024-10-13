/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shopKeeper_id` on the `Shop` table. All the data in the column will be lost.
  - The primary key for the `ShopKeeper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `Shopkeeper_id` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderOrder_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_shopKeeper_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "order_id" DROP DEFAULT,
ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id");
DROP SEQUENCE "Order_order_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "pid" DROP DEFAULT,
ALTER COLUMN "pid" SET DATA TYPE TEXT,
ALTER COLUMN "shopId" SET DATA TYPE TEXT,
ALTER COLUMN "orderOrder_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("pid");
DROP SEQUENCE "Product_pid_seq";

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
DROP COLUMN "shopKeeper_id",
ADD COLUMN     "Shopkeeper_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shop_id_seq";

-- AlterTable
ALTER TABLE "ShopKeeper" DROP CONSTRAINT "ShopKeeper_pkey",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Seller',
ALTER COLUMN "shopkeeper_id" DROP DEFAULT,
ALTER COLUMN "shopkeeper_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopKeeper_pkey" PRIMARY KEY ("shopkeeper_id");
DROP SEQUENCE "ShopKeeper_shopkeeper_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "isActive" SET DEFAULT true,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_Shopkeeper_id_fkey" FOREIGN KEY ("Shopkeeper_id") REFERENCES "ShopKeeper"("shopkeeper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderOrder_id_fkey" FOREIGN KEY ("orderOrder_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
