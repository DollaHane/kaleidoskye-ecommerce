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
              <Avatar className="size-24 shadow-md">
                {/* @ts-ignore */}
                <AvatarImage src={user[0].image} alt="profile-picture" />
              </Avatar>
              <h2 className="text-2xl font-bold">{user[0].name}</h2>
              <p className="text-muted-foreground">{user[0].email}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex size-5 items-center justify-center">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>
                {shippingAddress.unitNum === "" ? (
                  <p className="text-sm md:text-base">
                    {shippingAddress.streetAddress}, {shippingAddress.suburb}, {shippingAddress.city},{" "}
                    {shippingAddress.province}, {shippingAddress.zipCode}
                  </p>
                ) : (
                  <p className="text-sm md:text-base">
                    {shippingAddress.streetAddress}, {shippingAddress.suburb}, {shippingAddress.unitNum},{" "}
                    {shippingAddress.city}, {shippingAddress.province},{" "}
                    {shippingAddress.zipCode}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex size-5 items-center justify-center">
                  <Package className="size-4 text-muted-foreground" />
                </div>
                <p className="text-sm md:text-base">
                  <span className="font-semibold text-blue-500">
                    {orders.length}
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
  } else {
    return (
      <AnimatePresence>
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 overflow-hidden">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="flex size-24 items-center justify-center shadow-md">
                {/* @ts-ignore */}
                <User className="size-12" />
              </Avatar>
              <h2 className="text-2xl font-bold">John Smith</h2>
              <p className="text-muted-foreground">johnsmith@gmail.com</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex size-5 items-center justify-center">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>
                <p className="text-sm md:text-base">221B Baker Street, Newlands, Cape Town, Western Province, 6001</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex size-5 items-center justify-center">
                  <Package className="size-4 text-muted-foreground" />
                </div>
                <p className="text-sm md:text-base">
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
