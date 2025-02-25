"use client"

import React, { useRef, useState } from "react"
import { UseGetUserProfile } from "@/server/services"
import { AnimatePresence, motion } from "framer-motion"
import { MapPin, Package, User } from "lucide-react"

import { orderType, userType } from "@/types/db"
import { ShippingAddress } from "@/types/shipping-address"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "../ui/button"
import EditProfileForm from "./EditProfileForm"

interface UserProfileProps {
  orders: orderType[]
}

export default function UserProfile({ orders }: UserProfileProps) {
  const [edit, setEdit] = useState<boolean>(false)
  const user = UseGetUserProfile().data as userType[]
  const isFetching = UseGetUserProfile().isFetching

  function onCancel(data: boolean) {
    setEdit(data)
  }

  if (!isFetching) {
    const shippingAddress = user[0].shippingAddress as ShippingAddress
    return (
      <AnimatePresence>
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 overflow-hidden">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                {/* @ts-ignore */}
                <AvatarImage src={user[0].image} alt="profile-picture" />
              </Avatar>
              <h2 className="text-2xl font-bold">{user[0].name}</h2>
              <p className="text-muted-foreground">{user[0].email}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {shippingAddress.unitNum === "" ? (
                  <p>
                    {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                    {shippingAddress.province}, {shippingAddress.zipCode}
                  </p>
                ) : (
                  <p>
                    {shippingAddress.streetAddress}, {shippingAddress.unitNum},{" "}
                    {shippingAddress.city}, {shippingAddress.province},{" "}
                    {shippingAddress.zipCode}
                  </p>
                )}
              </div>
              {orders && orders.length > 0 ? (
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p>
                    <span className="font-semibold text-blue-500">
                      {orders.length}
                    </span>{" "}
                    orders in total
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p>
                    <span className="font-semibold text-blue-500">0</span>{" "}
                    orders in total
                  </p>
                </div>
              )}
            </div>
            {edit ? (
              <EditProfileForm onCancel={onCancel} user={user[0]} />
            ) : (
              <Button onClick={() => setEdit(true)}>Edit Profile</Button>
            )}
          </CardContent>
        </Card>
      </AnimatePresence>
    )
  } else {
    return (
      <AnimatePresence>
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 overflow-hidden">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="flex h-24 w-24 items-center justify-center">
                {/* @ts-ignore */}
                <User className="" />
              </Avatar>
              <h2 className="text-2xl font-bold">Name</h2>
              <p className="text-muted-foreground">namesurname@acme.co.za</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p>Shipping address</p>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <p>
                  <span className="texted-muted-foreground font-semibold">
                    0
                  </span>{" "}
                  orders in total
                </p>
              </div>
            </div>
            {edit ? (
              <EditProfileForm onCancel={onCancel} user={user[0]} />
            ) : (
              <Button onClick={() => setEdit(true)}>Edit Profile</Button>
            )}
          </CardContent>
        </Card>
      </AnimatePresence>
    )
  }
}
