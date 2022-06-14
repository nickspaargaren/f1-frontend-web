/*
  Warnings:

  - A unique constraint covering the columns `[gamertag,circuit]` on the table `Times` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Times_gamertag_circuit_key" ON "Times"("gamertag", "circuit");
