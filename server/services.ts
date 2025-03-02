'use client'
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./actions";
import { userType } from "@/types/db";

export function UseGetUserProfile() {
  return useQuery<userType[]>({
    queryKey: ["userInfo"],
    // @ts-ignore
    queryFn: () => getUserInfo(),
  })
}