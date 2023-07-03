-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentID" TEXT NOT NULL,
    "userRoleID" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "employeeID" TEXT NOT NULL,
    "colorID" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarColor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "AvatarColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "typeID" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTypes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "streetNo" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "coordinatesID" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCourse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrainingCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "workingField" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyID" TEXT NOT NULL,
    "commentID" TEXT NOT NULL,

    CONSTRAINT "CompanyComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jobPosition" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "companyID" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactID" TEXT NOT NULL,
    "commentID" TEXT NOT NULL,

    CONSTRAINT "ContactComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "officeID" TEXT NOT NULL,
    "contactID" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "countryOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "ppsn" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,
    "airport" TEXT NOT NULL,
    "airportComment" TEXT NOT NULL,
    "a1Payroll" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderCode" TEXT NOT NULL,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "clientID" TEXT NOT NULL,
    "accountManagerID" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,
    "commentToGeneralInformation" TEXT NOT NULL,
    "projectAddressID" TEXT NOT NULL,
    "deliveryAddressID" TEXT NOT NULL,
    "invoicingAddressID" TEXT NOT NULL,
    "invoiceEmail" TEXT NOT NULL,
    "inductionAddressID" TEXT NOT NULL,
    "orgaNumber" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL,
    "payTerm" TEXT NOT NULL,
    "rct" TEXT NOT NULL,
    "invoicingFrequency" TEXT NOT NULL,
    "commentToInvoicing" TEXT NOT NULL,
    "inductionDateTime" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "estimatedDuration" TEXT NOT NULL,
    "commentToDuration" TEXT NOT NULL,
    "meetingPersonID" TEXT NOT NULL,
    "breakTime" TEXT NOT NULL,
    "breaksPaid" TEXT NOT NULL,
    "rotation" TEXT NOT NULL,
    "workingHours" JSONB NOT NULL DEFAULT '{ "mo": "0", "tu": "0", "we": "0", "th": "0", "fr": "0", "sa": "0", "su": "0" }',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeStatus" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "EmployeeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "professionalTrade" TEXT NOT NULL,
    "recruitedByID" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriversLicense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "countryOfIssue" TEXT NOT NULL,

    CONSTRAINT "DriversLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NationalIDCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "countryOfIssue" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "NationalIDCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassportInformation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "countryOfIssue" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "PassportInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankInformation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "bicSwift" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingSize" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "jacket" TEXT NOT NULL,
    "waist" TEXT NOT NULL,
    "leg" TEXT NOT NULL,
    "shoes" TEXT NOT NULL,

    CONSTRAINT "ClothingSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "contactID" TEXT NOT NULL,
    "relation" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCertificate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "trainingCourseID" TEXT NOT NULL,

    CONSTRAINT "TrainingCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InductionForm" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "fileID" TEXT NOT NULL,

    CONSTRAINT "InductionForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeID" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "jobRoleID" TEXT NOT NULL,

    CONSTRAINT "ProjectHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCourseRequired" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "courseID" TEXT NOT NULL,

    CONSTRAINT "TrainingCourseRequired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerRequired" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "jobRoleID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "WorkerRequired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPerformed" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "workTypeID" TEXT NOT NULL,

    CONSTRAINT "WorkPerformed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayChargeRate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "payRateID" TEXT NOT NULL,
    "chargeRateID" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,
    "jobRoleID" TEXT NOT NULL,
    "old" JSONB NOT NULL DEFAULT '{ "payRate": { "normal": "0", "ot1": "0", "ot2": "0", "ot3": "0", "ot4": "0"} , "chargeRate": { "normal": "0", "ot1": "0", "ot2": "0", "ot3": "0", "ot4": "0"} }',

    CONSTRAINT "PayChargeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayRate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "normal" DOUBLE PRECISION NOT NULL,
    "ot1" DOUBLE PRECISION NOT NULL,
    "ot2" DOUBLE PRECISION NOT NULL,
    "ot3" DOUBLE PRECISION NOT NULL,
    "ot4" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PayRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargeRate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "normal" DOUBLE PRECISION NOT NULL,
    "ot1" DOUBLE PRECISION NOT NULL,
    "ot2" DOUBLE PRECISION NOT NULL,
    "ot3" DOUBLE PRECISION NOT NULL,
    "ot4" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ChargeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "contactID" TEXT NOT NULL,
    "orderNo" INTEGER NOT NULL,

    CONSTRAINT "ContactOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeID_key" ON "User"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AvatarColor_color_key" ON "AvatarColor"("color");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_addressID_key" ON "Project"("addressID");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTypes_name_key" ON "ProjectTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_coordinatesID_key" ON "Address"("coordinatesID");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingCourse_name_key" ON "TrainingCourse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobRole_name_key" ON "JobRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkType_name_key" ON "WorkType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyComment_commentID_key" ON "CompanyComment"("commentID");

-- CreateIndex
CREATE UNIQUE INDEX "ContactComment_commentID_key" ON "ContactComment"("commentID");

-- CreateIndex
CREATE UNIQUE INDEX "Office_name_key" ON "Office"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Office_addressID_key" ON "Office"("addressID");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contactID_key" ON "Employee"("contactID");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");

-- CreateIndex
CREATE UNIQUE INDEX "DriversLicense_employeeID_key" ON "DriversLicense"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "NationalIDCard_employeeID_key" ON "NationalIDCard"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "PassportInformation_employeeID_key" ON "PassportInformation"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "BankInformation_employeeID_key" ON "BankInformation"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingSize_employeeID_key" ON "ClothingSize"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_employeeID_key" ON "EmergencyContact"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "InductionForm_fileID_key" ON "InductionForm"("fileID");

-- CreateIndex
CREATE UNIQUE INDEX "PayChargeRate_payRateID_key" ON "PayChargeRate"("payRateID");

-- CreateIndex
CREATE UNIQUE INDEX "PayChargeRate_chargeRateID_key" ON "PayChargeRate"("chargeRateID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleID_fkey" FOREIGN KEY ("userRoleID") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_colorID_fkey" FOREIGN KEY ("colorID") REFERENCES "AvatarColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "ProjectTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_coordinatesID_fkey" FOREIGN KEY ("coordinatesID") REFERENCES "Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyComment" ADD CONSTRAINT "CompanyComment_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyComment" ADD CONSTRAINT "CompanyComment_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactComment" ADD CONSTRAINT "ContactComment_contactID_fkey" FOREIGN KEY ("contactID") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactComment" ADD CONSTRAINT "ContactComment_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeID_fkey" FOREIGN KEY ("officeID") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_contactID_fkey" FOREIGN KEY ("contactID") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accountManagerID_fkey" FOREIGN KEY ("accountManagerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_projectAddressID_fkey" FOREIGN KEY ("projectAddressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAddressID_fkey" FOREIGN KEY ("deliveryAddressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_invoicingAddressID_fkey" FOREIGN KEY ("invoicingAddressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_inductionAddressID_fkey" FOREIGN KEY ("inductionAddressID") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_meetingPersonID_fkey" FOREIGN KEY ("meetingPersonID") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeStatus" ADD CONSTRAINT "EmployeeStatus_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_recruitedByID_fkey" FOREIGN KEY ("recruitedByID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriversLicense" ADD CONSTRAINT "DriversLicense_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NationalIDCard" ADD CONSTRAINT "NationalIDCard_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassportInformation" ADD CONSTRAINT "PassportInformation_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankInformation" ADD CONSTRAINT "BankInformation_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingSize" ADD CONSTRAINT "ClothingSize_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_contactID_fkey" FOREIGN KEY ("contactID") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCertificate" ADD CONSTRAINT "TrainingCertificate_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCertificate" ADD CONSTRAINT "TrainingCertificate_trainingCourseID_fkey" FOREIGN KEY ("trainingCourseID") REFERENCES "TrainingCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InductionForm" ADD CONSTRAINT "InductionForm_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InductionForm" ADD CONSTRAINT "InductionForm_fileID_fkey" FOREIGN KEY ("fileID") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_jobRoleID_fkey" FOREIGN KEY ("jobRoleID") REFERENCES "JobRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourseRequired" ADD CONSTRAINT "TrainingCourseRequired_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourseRequired" ADD CONSTRAINT "TrainingCourseRequired_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "TrainingCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerRequired" ADD CONSTRAINT "WorkerRequired_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerRequired" ADD CONSTRAINT "WorkerRequired_jobRoleID_fkey" FOREIGN KEY ("jobRoleID") REFERENCES "JobRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPerformed" ADD CONSTRAINT "WorkPerformed_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPerformed" ADD CONSTRAINT "WorkPerformed_workTypeID_fkey" FOREIGN KEY ("workTypeID") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayChargeRate" ADD CONSTRAINT "PayChargeRate_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayChargeRate" ADD CONSTRAINT "PayChargeRate_payRateID_fkey" FOREIGN KEY ("payRateID") REFERENCES "PayRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayChargeRate" ADD CONSTRAINT "PayChargeRate_chargeRateID_fkey" FOREIGN KEY ("chargeRateID") REFERENCES "ChargeRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayChargeRate" ADD CONSTRAINT "PayChargeRate_jobRoleID_fkey" FOREIGN KEY ("jobRoleID") REFERENCES "JobRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactOrder" ADD CONSTRAINT "ContactOrder_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactOrder" ADD CONSTRAINT "ContactOrder_contactID_fkey" FOREIGN KEY ("contactID") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
