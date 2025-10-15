/*
  Warnings:

  - You are about to drop the column `agencia` on the `BankData` table. All the data in the column will be lost.
  - You are about to drop the column `banco` on the `BankData` table. All the data in the column will be lost.
  - You are about to drop the column `chavePix` on the `BankData` table. All the data in the column will be lost.
  - You are about to drop the column `contra` on the `BankData` table. All the data in the column will be lost.
  - You are about to drop the column `tipoConta` on the `BankData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[branch]` on the table `BankData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account` to the `BankData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountType` to the `BankData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank` to the `BankData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `BankData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixKey` to the `BankData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."BankData_agencia_key";

-- AlterTable
ALTER TABLE "BankData" DROP COLUMN "agencia",
DROP COLUMN "banco",
DROP COLUMN "chavePix",
DROP COLUMN "contra",
DROP COLUMN "tipoConta",
ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "accountType" TEXT NOT NULL,
ADD COLUMN     "bank" TEXT NOT NULL,
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "pixKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankData_branch_key" ON "BankData"("branch");
