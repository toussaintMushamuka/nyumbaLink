-- CreateEnum
CREATE TYPE "public"."AnnonceStatus" AS ENUM ('DISPONIBLE', 'INDISPONIBLE');

-- AlterTable
ALTER TABLE "public"."Annonce" ADD COLUMN     "status" "public"."AnnonceStatus" NOT NULL DEFAULT 'DISPONIBLE';
