import axiosInstance from "@/helper/axios";
import { buildQueryString } from "@/helper/buildQueryString";
import { IUserForm } from "@/type";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getCustomers = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  const queryString = buildQueryString(JSON.parse(search));
  const res = await axiosInstance.get(`/users?${queryString}`);
  return res.data;
};

export const handleCustomer = async (userId: string, type: string) => {
  const res = await axiosInstance.post("/users", {
    userId,
    type,
  });
  return res.data;
};

export const editCustomer = async (
  data: Partial<IUserForm>,
  userId: string
) => {
  const res = await axiosInstance.put(`/users/${userId}`, data);
  return res.data;
};
