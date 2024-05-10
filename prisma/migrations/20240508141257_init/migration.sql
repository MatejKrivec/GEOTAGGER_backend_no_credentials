-- CreateTable
CREATE TABLE "USER" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_username_key" ON "USER"("username");

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");
