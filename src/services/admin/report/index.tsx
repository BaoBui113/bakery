import axiosInstance from "@/helper/axios";
import { buildQueryString } from "@/helper/buildQueryString";
import { QueryFunctionContext } from "@tanstack/react-query";

// export const getReport = async (type: string) => {
//   const res = await axiosInstance.get(`/reports?type=${type}`);
//   return res.data;
// };

export const getReport = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  console.log("search", search);

  const queryString = buildQueryString(JSON.parse(search));
  console.log("queryString", queryString);

  const res = await axiosInstance.get(`/reports?${queryString}`);
  return res.data;
};

export const getUserReport = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  console.log("search", search);

  const queryString = buildQueryString(JSON.parse(search));
  console.log("queryString", queryString);

  const res = await axiosInstance.get(`/reports/user-register?${queryString}`);
  return res.data;
};
