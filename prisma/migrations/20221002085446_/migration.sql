-- AlterTable
ALTER TABLE "Accident" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "driver_permit_number" DROP NOT NULL,
ALTER COLUMN "driver_permit_place" DROP NOT NULL,
ALTER COLUMN "driver_permit_date" DROP NOT NULL;
