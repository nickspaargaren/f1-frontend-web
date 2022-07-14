/*
  Warnings:

  - A unique constraint covering the columns `[gamertag]` on the table `Times` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Times_gamertag_key" ON "Times"("gamertag");
