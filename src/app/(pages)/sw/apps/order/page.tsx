import React, { Fragment } from 'react'
import OrderFormContent from './content'
import { trpc } from '@/lib/trpc/ssTRPC'
import { Prisma } from '@prisma/client'

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

export default async function OrderForm() {

  let data = await trpc.getAllOrders();

  let projectsData = await trpc.getAllProjects();
  let companiesData = await trpc.getAllCompanies();
  let jobRoles = await trpc.getAllJobRoles();
  return (
    <Fragment>
        <OrderFormContent orderData={data} projectsData={projectsData} companiesData={companiesData} jobRolesData={jobRoles}/>
    </Fragment>
  )
}
