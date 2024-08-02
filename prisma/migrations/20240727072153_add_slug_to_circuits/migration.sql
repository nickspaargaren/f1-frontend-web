/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Circuits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Circuits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circuits" ADD COLUMN     "slug" TEXT NOT NULL;

-- Update existing rows to set slug = name
UPDATE "Circuits" SET "slug" = "name";

-- CreateIndex
CREATE UNIQUE INDEX "Circuits_slug_key" ON "Circuits"("slug");
