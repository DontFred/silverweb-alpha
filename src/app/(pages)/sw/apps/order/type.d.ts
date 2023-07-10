import { Prisma } from "@prisma/client"

export type OrderProps = Prisma.OrderGetPayload<{
    include: {
      client: {
        include: {
          company: true
        }
      },
      Project: true
    }
  }>
  
  export type JobRolesProps = Prisma.JobRoleGetPayload<{
    
  }>
  
  export type ProjectProps = Prisma.ProjectGetPayload<{
    include: {
      address: {
        include: {
          coordinates: true,
        },
      },
      type: true,
    }
  }>
  
  export type CompanyProps = Prisma.CompanyGetPayload<{
    include: {
      ClientProfiles: true,
      address: true
    }
  }>

  type AddOrderProps = {
    orderCode: string;
    projectRef?: string;
    clientRef: string;
    registerName?: string;
    registerAddress?: {
      streetNo: string;
      postalCode: string;
      city: string;
      country: string;
    };
    salesContact?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    currency: string;
    payChargeRates: {
      jobRole: string;
      payRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
      chargeRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
    }[];
  };