/*
  Warnings:

  - The primary key for the `Circuits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `winner` on the `Circuits` table. All the data in the column will be lost.
  - The `id` column on the `Circuits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Times` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `circuit` on the `Times` table. All the data in the column will be lost.
  - The `id` column on the `Times` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Circuits" DROP CONSTRAINT "Circuits_pkey",
DROP COLUMN "winner",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Circuits_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Times" DROP CONSTRAINT "Times_pkey",
DROP COLUMN "circuit",
ADD COLUMN     "circuitId" SERIAL NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Times_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Times" ADD CONSTRAINT "Times_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
