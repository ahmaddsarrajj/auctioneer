-- CreateTable
CREATE TABLE "Network" (
    "HNC" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("HNC")
);

-- CreateTable
CREATE TABLE "HealthInstituation" (
    "HI" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "network_id" INTEGER NOT NULL,

    CONSTRAINT "HealthInstituation_pkey" PRIMARY KEY ("HI")
);

-- CreateTable
CREATE TABLE "Department" (
    "DC" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hinstituation_id" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("DC")
);
