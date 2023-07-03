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

export default async function OrderForm() {

  let data = await trpc.getAllOrders();
  return (
    <Fragment>
        <OrderFormContent orderData={data}/>
    </Fragment>
  )
}
