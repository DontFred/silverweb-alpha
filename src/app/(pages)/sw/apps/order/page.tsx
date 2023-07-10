import React, { Fragment } from 'react'
import OrderFormContent from './content'
import { trpc } from '@/lib/trpc/ssTRPC'

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
