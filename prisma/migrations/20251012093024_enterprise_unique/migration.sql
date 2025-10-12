/*
  Warnings:

  - A unique constraint covering the columns `[enterprise]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_enterprise_key" ON "User"("enterprise");
