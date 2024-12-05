import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../actions/get-user-list";
import { userType } from "@/types/db";

export async function UseGetUserList() {
  return useQuery<userType[]>({
    queryKey: ["users"],
    queryFn: getUserList
  })
}