/*
  Warnings:

  - Added the required column `date` to the `Guess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guess" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
