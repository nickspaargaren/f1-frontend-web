/*
  Warnings:

  - The primary key for the `Times` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Times_gamertag_circuit_key";

-- AlterTable
ALTER TABLE "Times" DROP CONSTRAINT "Times_pkey",
ADD CONSTRAINT "Times_pkey" PRIMARY KEY ("gamertag", "circuit");
