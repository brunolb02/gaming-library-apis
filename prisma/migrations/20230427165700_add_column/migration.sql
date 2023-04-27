-- AlterTable
ALTER TABLE "pending_games" ADD COLUMN     "platforms" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "playing_games" ADD COLUMN     "platforms" TEXT[] DEFAULT ARRAY[]::TEXT[];
