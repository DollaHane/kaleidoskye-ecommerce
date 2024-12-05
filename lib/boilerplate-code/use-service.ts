import { useQuery } from "@tanstack/react-query";
import { get } from "./action";

export async function UseGet() {
  return useQuery<any[]>({
    queryKey: ["..."],
    queryFn: get
  })
}