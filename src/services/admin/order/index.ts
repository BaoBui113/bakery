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

export const confirmOrders = async (orderId: string, userId: string) => {
  const res = await axiosInstance.post("/orders/confirm", {
    orderId,
    userId,
  });
  return res.data;
};

export const cancelOrders = async (orderId: string, userId: string) => {
  const res = await axiosInstance.post("/orders/cancel", {
    orderId,
    userId,
  });
  return res.data;
};

export const editQuantityOrders = async (
  orderId: string,
  userId: string,
  newQuantity: number
) => {
  const res = await axiosInstance.post("/orders/edit-quantity", {
    orderId,
    userId,
    newQuantity,
  });
  return res.data;
};
