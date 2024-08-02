/*
  Warnings:

  - You are about to drop the `Circuits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Times` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Times" DROP CONSTRAINT "Times_circuitId_fkey";

-- DropTable
DROP TABLE "Circuits";

-- DropTable
DROP TABLE "Times";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "gamertag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuit" (
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "time" TEXT NOT NULL,
    "gamertag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "circuitId" SERIAL NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gamertag_key" ON "User"("gamertag");

-- CreateIndex
CREATE UNIQUE INDEX "Circuit_name_key" ON "Circuit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Circuit_slug_key" ON "Circuit"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Time_circuitId_gamertag_key" ON "Time"("circuitId", "gamertag");

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
