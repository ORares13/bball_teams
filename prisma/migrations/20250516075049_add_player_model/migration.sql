-- CreateEnum
CREATE TYPE "Competition" AS ENUM ('euroleague', 'eurocup');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "arena" TEXT NOT NULL,
    "arenaCapacity" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "competition" "Competition" NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "age" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
