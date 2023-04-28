/*
  Warnings:

  - The `user_score` column on the `completed_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "completed_games" DROP COLUMN "user_score",
ADD COLUMN     "user_score" INTEGER NOT NULL DEFAULT 0;
