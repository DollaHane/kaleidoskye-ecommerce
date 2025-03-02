"use client"

import React, { useState } from "react"
import Image from "next/image"
import { UseGetUserProfile } from "@/server/services"

import { userType } from "@/types/db"
import { ShippingAddress } from "@/types/shipping-address"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Checkout from "@/components/Assets/Checkout.png"

import EditProfileForm from "../PageAccount/EditProfileForm"
import { Button } from "../ui/button"

const headingStyle = "font-semibold"
const dataStyle = "text-primary"
const fieldStyle = "w-full grid grid-cols-1 sm:grid-cols-2 pb-1"
const fieldStyleTwo = "w-full flex flex-col"

export default function ShippingDetails() {
  const [edit, setEdit] = useState<boolean>(false)
  const user = UseGetUserProfile().data as userType[]
  const isFetching = UseGetUserProfile().isFetching
  function onCancel(data: boolean) {
    setEdit(data)
  }
  if (!isFetching) {
    const shippingAddress = user[0].shippingAddress as ShippingAddress
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Confirm your shipping details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-hidden">
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Name:</h3>
            <p className={`${dataStyle}`}>{user[0].firstname}</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Surname:</h3>
            <p className={`${dataStyle}`}>{user[0].lastname}</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Email:</h3>
            <p className={`${dataStyle}`}>{user[0].email}</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Contact Num.:</h3>
            <p className={`${dataStyle}`}>+27 (0) {user[0].phone}</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Shipping Address:</h3>
            <div className={`${fieldStyleTwo}`}>
              <p className={`${dataStyle}`}>{shippingAddress.streetAddress}</p>
              {shippingAddress.unitNum && (
                <p className={`${dataStyle}`}>{shippingAddress.unitNum}</p>
              )}
              <p className={`${dataStyle}`}>{shippingAddress.city}</p>
              <p className={`${dataStyle}`}>{shippingAddress.province}</p>
              <p className={`${dataStyle}`}>{shippingAddress.zipCode}</p>
            </div>
          </div>
          {edit ? (
            <EditProfileForm onCancel={onCancel} user={user[0]} />
          ) : (
            <Button onClick={() => setEdit(true)}>Edit Shipping Details</Button>
          )}
        </CardContent>
        <CardFooter className="mt-8 p-0">
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={Checkout}
              alt="delivered to your doorstep"
              className="size-full object-cover"
            />
          </div>
        </CardFooter>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Confirm your shipping details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-hidden">
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Name:</h3>
            <p className={`${dataStyle}`}>Name</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Surname:</h3>
            <p className={`${dataStyle}`}>Surname</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Email:</h3>
            <p className={`${dataStyle}`}>namesurname@acme.co.za</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Contact Num.:</h3>
            <p className={`${dataStyle}`}>+27 (0) 82 xxx xxxx</p>
          </div>
          <div className={`${fieldStyle}`}>
            <h3 className={`${headingStyle}`}>Shipping Address:</h3>
            <div className={`${fieldStyleTwo}`}>
              <p className={`${dataStyle}`}>Street Name</p>
              <p className={`${dataStyle}`}>Suburb</p>
              <p className={`${dataStyle}`}>City</p>
              <p className={`${dataStyle}`}>ZIP Code</p>
            </div>
          </div>
          {edit ? (
            <EditProfileForm onCancel={onCancel} user={user[0]} />
          ) : (
            <Button onClick={() => setEdit(true)}>Edit Shipping Details</Button>
          )}
        </CardContent>
      </Card>
    )
  }
}
