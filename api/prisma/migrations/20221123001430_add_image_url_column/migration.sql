/*
  Warnings:

  - Added the required column `imageURL` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "imageURL" TEXT NOT NULL;
