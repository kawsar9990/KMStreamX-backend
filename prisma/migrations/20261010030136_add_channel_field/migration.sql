/*
  Warnings:

  - You are about to drop the `ChannelReaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelReaction" DROP CONSTRAINT "ChannelReaction_channelId_fkey";

-- DropTable
DROP TABLE "ChannelReaction";

-- DropEnum
DROP TYPE "ReactionType";
