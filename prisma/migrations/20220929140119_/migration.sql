/*
  Warnings:

  - Changed the type of `access_token_expires` on the `Authentication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `refresh_token_expires` on the `Authentication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "access_token_expires",
ADD COLUMN     "access_token_expires" INTEGER NOT NULL,
DROP COLUMN "refresh_token_expires",
ADD COLUMN     "refresh_token_expires" INTEGER NOT NULL;
