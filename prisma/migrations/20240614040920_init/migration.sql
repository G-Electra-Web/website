-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'FACULTY', 'ADMIN');

-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "isEmailVerified" BOOLEAN NOT NULL,
    "passwordhash" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "regno" TEXT NOT NULL,
    "projects" INTEGER[],

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "team_code" TEXT NOT NULL,
    "ph_no" TEXT NOT NULL,
    "project_desc" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "lead" INTEGER NOT NULL,
    "members" INTEGER[],
    "is_approved" BOOLEAN NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Role" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ph_no" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
