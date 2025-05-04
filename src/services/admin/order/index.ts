import axiosInstance from "@/helper/axios";
import { buildQueryString } from "@/helper/buildQueryString";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getOrders = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  const queryString = buildQueryString(JSON.parse(search));

  const res = await axiosInstance.get(`/orders?${queryString}`);
  return res.data;
};
