-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Transgender');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('Aadhaar', 'PAN', 'VoterCard', 'Passport');

-- CreateEnum
CREATE TYPE "CibilCheckStatus" AS ENUM ('UNSUBMITTED', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('HOME', 'PERSONAL', 'CAR', 'BUSINESS', 'EDUCATION');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED', 'CLOSED');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "address" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "identityType" "IdentityType",
    "identityNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latestCibilId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_sessions" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "otp_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPage" TEXT,
    "totalPageViews" INTEGER NOT NULL DEFAULT 0,
    "pagesVisited" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "deviceInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cibil_data" (
    "id" TEXT NOT NULL,
    "score" INTEGER,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "mobileNumber" TEXT,
    "identityType" "IdentityType",
    "identityNumber" TEXT,
    "panNumber" TEXT,
    "address" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "source" TEXT,
    "reportData" JSONB,
    "fetchedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "transactionId" TEXT,
    "sessionUrl" TEXT,
    "pdfUrl" TEXT,
    "isCached" BOOLEAN NOT NULL DEFAULT false,
    "cacheValidUntil" TIMESTAMP(3),
    "lastApiCall" TIMESTAMP(3),
    "requestedIp" TEXT,
    "requestedUA" TEXT,
    "status" "CibilCheckStatus" NOT NULL DEFAULT 'UNSUBMITTED',
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "tempFormData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cibil_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "type" "LoanType" NOT NULL,
    "amount" DECIMAL(12,2),
    "interestRate" DECIMAL(5,2),
    "duration" INTEGER,
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "purpose" TEXT,
    "monthlyIncome" DECIMAL(12,2),
    "employmentType" TEXT,
    "documents" JSONB,
    "remarks" TEXT,
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "tempFormData" JSONB,
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "cibilDataId" TEXT,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_latestCibilId_key" ON "users"("latestCibilId");

-- CreateIndex
CREATE INDEX "otp_sessions_phoneNumber_idx" ON "otp_sessions"("phoneNumber");

-- CreateIndex
CREATE INDEX "otp_sessions_expiresAt_idx" ON "otp_sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_sessionId_key" ON "user_sessions"("sessionId");

-- CreateIndex
CREATE INDEX "user_sessions_userId_idx" ON "user_sessions"("userId");

-- CreateIndex
CREATE INDEX "user_sessions_isActive_idx" ON "user_sessions"("isActive");

-- CreateIndex
CREATE INDEX "user_sessions_lastActivity_idx" ON "user_sessions"("lastActivity");

-- CreateIndex
CREATE INDEX "cibil_data_userId_expiresAt_idx" ON "cibil_data"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "cibil_data_status_idx" ON "cibil_data"("status");

-- CreateIndex
CREATE INDEX "cibil_data_panNumber_idx" ON "cibil_data"("panNumber");

-- CreateIndex
CREATE INDEX "loans_userId_idx" ON "loans"("userId");

-- CreateIndex
CREATE INDEX "loans_status_idx" ON "loans"("status");

-- CreateIndex
CREATE INDEX "loans_type_idx" ON "loans"("type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_latestCibilId_fkey" FOREIGN KEY ("latestCibilId") REFERENCES "cibil_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp_sessions" ADD CONSTRAINT "otp_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cibil_data" ADD CONSTRAINT "cibil_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_cibilDataId_fkey" FOREIGN KEY ("cibilDataId") REFERENCES "cibil_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
