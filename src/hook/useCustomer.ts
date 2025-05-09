import { editCustomer, handleCustomer } from "@/services/admin/customer";
import { IUserForm } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useHandleCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, userId }: { type: string; userId: string }) =>
      handleCustomer(userId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Cập nhật user thất bại", { duration: 4000 });
    },
  });
};

export const useEditCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      userId,
    }: {
      data: Partial<IUserForm>;
      userId: string;
    }) => editCustomer(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cập nhật user thành công", { duration: 4000 });
    },
    onError: (err: unknown) => {
      console.log(err);

      let errorMessage = "Cập nhật user thất bại";

      if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      toast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};
