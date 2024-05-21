-- AlterTable
ALTER TABLE "USER" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "LocationID" INTEGER NOT NULL,
    "guessedLocation" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);
