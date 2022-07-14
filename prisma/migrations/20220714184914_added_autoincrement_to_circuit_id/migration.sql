-- AlterTable
CREATE SEQUENCE "times_circuitid_seq";
ALTER TABLE "Times" ALTER COLUMN "circuitId" SET DEFAULT nextval('times_circuitid_seq');
ALTER SEQUENCE "times_circuitid_seq" OWNED BY "Times"."circuitId";
