import { Fragment } from 'react'
import OrderFormContent from './content'
import { trpc } from '@/lib/trpc/ssTRPC'
import { notFound } from 'next/navigation'

export default async function OrderForm({ params }: { params: { order_id: string } }) {
  let data = await trpc.getOrderFormById(params.order_id)
  if (!data){
    notFound()
  }
  const order = await trpc.getOrderById(data.orderID)
  if (!order){
    notFound()
  }
  return (
    <Fragment>
      <OrderFormContent order={order} auth={data.password}/>
    </Fragment>
  )
}
