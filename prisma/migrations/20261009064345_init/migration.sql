-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LOVE', 'LIKE', 'FIRE', 'FUNNY', 'WOW');

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "channelLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelReaction" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "type" "ReactionType" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChannelReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelReaction_channelId_idx" ON "ChannelReaction"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelReaction_channelId_type_key" ON "ChannelReaction"("channelId", "type");

-- AddForeignKey
ALTER TABLE "ChannelReaction" ADD CONSTRAINT "ChannelReaction_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
