"use client";

import axiosInstance from "@/helper/axios";
import { LoginFormInputs } from "@/type";

export const loginAdmin = async (data: LoginFormInputs) => {
  const res = await axiosInstance.post("auth/admin/login", data);
  return res.data;
};
