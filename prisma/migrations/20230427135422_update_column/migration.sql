/*
  Warnings:

  - The `metacritic_score` column on the `completed_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metacritic_score` column on the `pending_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metacritic_score` column on the `playing_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "completed_games" DROP COLUMN "metacritic_score",
ADD COLUMN     "metacritic_score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pending_games" DROP COLUMN "metacritic_score",
ADD COLUMN     "metacritic_score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "playing_games" DROP COLUMN "metacritic_score",
ADD COLUMN     "metacritic_score" INTEGER NOT NULL DEFAULT 0;
