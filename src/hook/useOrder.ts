import { checkout } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCheckout = () => {
  return useMutation({
    mutationFn: ({ token }: { token: string }) => checkout(token),
    onSuccess: () => {
      toast.success("Cập nhật order thành công", { duration: 4000 });
    },
    onError: () => {
      toast.error("Cập nhật order thất bại", { duration: 4000 });
    },
  });
};
