-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
