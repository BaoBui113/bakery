import axiosInstance from "@/helper/axios";
import { buildQueryString } from "@/helper/buildQueryString";
import { IProductForm } from "@/type";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, search] = queryKey;
  const queryString = buildQueryString(JSON.parse(search));

  const res = await axiosInstance.get(`/products?${queryString}`);
  return res.data;
};

export const createProduct = async (data: IProductForm) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (data: IProductForm, id: string) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};
export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

export const uploadImage = async (data: FormData) => {
  const res = await axiosInstance.post("/uploads", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteImage = async (publicId: string) => {
  const res = await axiosInstance.post("/delete-upload", {
    publicId,
  });
  return res.data;
};
