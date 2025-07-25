-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "has_completed_onboarding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[];
