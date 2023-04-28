-- AlterTable
ALTER TABLE "completed_games" ALTER COLUMN "release_date" SET DATA TYPE DATE,
ALTER COLUMN "completed_date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "pending_games" ALTER COLUMN "release_date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "playing_games" ALTER COLUMN "release_date" SET DATA TYPE DATE,
ALTER COLUMN "start_date" SET DATA TYPE DATE;
