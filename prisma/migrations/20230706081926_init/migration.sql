-- CreateTable
CREATE TABLE "OrderFormAuth" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "OrderFormAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderFormAuth_orderID_key" ON "OrderFormAuth"("orderID");

-- CreateIndex
CREATE UNIQUE INDEX "OrderFormAuth_password_key" ON "OrderFormAuth"("password");

-- AddForeignKey
ALTER TABLE "OrderFormAuth" ADD CONSTRAINT "OrderFormAuth_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
