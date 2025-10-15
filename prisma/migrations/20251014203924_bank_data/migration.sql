-- CreateTable
CREATE TABLE "BankData" (
    "id" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "contra" TEXT NOT NULL,
    "tipoConta" TEXT NOT NULL,
    "chavePix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enterpriseId" TEXT NOT NULL,

    CONSTRAINT "BankData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankData_agencia_key" ON "BankData"("agencia");

-- CreateIndex
CREATE UNIQUE INDEX "BankData_enterpriseId_key" ON "BankData"("enterpriseId");

-- AddForeignKey
ALTER TABLE "BankData" ADD CONSTRAINT "BankData_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
