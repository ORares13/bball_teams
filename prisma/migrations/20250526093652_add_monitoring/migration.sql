-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "entity" TEXT,
ADD COLUMN     "entityId" TEXT;

-- CreateTable
CREATE TABLE "MonitoredUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonitoredUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonitoredUser_userId_key" ON "MonitoredUser"("userId");

-- AddForeignKey
ALTER TABLE "MonitoredUser" ADD CONSTRAINT "MonitoredUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
