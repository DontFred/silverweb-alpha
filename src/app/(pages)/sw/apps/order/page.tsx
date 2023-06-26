import React, { Fragment } from 'react'
import OrderFormContent from './content'
import { OrderProps as FakerOrderProps } from '@/faker.d'
import { createRandomOrder } from '@/faker'
import { faker } from '@faker-js/faker'

export type OrderProps = FakerOrderProps

async function getOrderFormData(){
    const OrderData = faker.helpers.multiple(createRandomOrder, {count: 15})

    return OrderData as OrderProps[]
}
export default async function OrderForm() {

    const OrderData = await getOrderFormData()
  return (
    <Fragment>
        <OrderFormContent orderData={OrderData}/>
    </Fragment>
  )
}
