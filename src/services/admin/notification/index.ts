import axiosInstance from "@/helper/axios";
import { buildQueryString } from "@/helper/buildQueryString";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getNotification = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  const queryString = buildQueryString(JSON.parse(search));
  const res = await axiosInstance.get(`/notifications?${queryString}`);
  return res.data;
};

export const maskReadNotification = async (notificationId: string) => {
  const res = await axiosInstance.put(`/notifications/${notificationId}`);
  return res.data;
};
