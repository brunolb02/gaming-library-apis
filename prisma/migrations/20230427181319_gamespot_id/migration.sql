/*
  Warnings:

  - Added the required column `gamespot_id` to the `completed_games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamespot_id` to the `pending_games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamespot_id` to the `playing_games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "completed_games" ADD COLUMN     "gamespot_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pending_games" ADD COLUMN     "gamespot_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "playing_games" ADD COLUMN     "gamespot_id" INTEGER NOT NULL;
