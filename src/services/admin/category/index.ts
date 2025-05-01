import axiosInstance from "@/helper/axios";

export const getCategories = async () => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};
