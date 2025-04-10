"use client"

import { useQuery } from "@tanstack/react-query"

import { RedisCartItem } from "@/types/cart-item"
import { userType } from "@/types/db"

import { getUserCart, getUserInfo } from "./actions"

export function UseGetUserProfile() {
  return useQuery<userType[]>({
    queryKey: ["userInfo"],
    // @ts-ignore
    queryFn: () => getUserInfo(),
  })
}

export function UseGetUserCart() {
  return useQuery<RedisCartItem[]>({
    queryKey: ["userCart"],
    // @ts-ignore
    queryFn: () => getUserCart(),
  })
}
