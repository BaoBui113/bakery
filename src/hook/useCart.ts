import { removeFromCart, updateCart } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCart = () => {
  return useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      removeFromCart(id, token),
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công", { duration: 4000 });
    },
  });
};

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: ({
      id,
      quantity,
      token,
    }: {
      id: string;
      quantity: number;
      token: string;
    }) => updateCart(quantity, id, token),
    onSuccess: () => {
      toast.success("Cập nhật giỏ hàng thành công", { duration: 4000 });
    },
    onError: () => {
      toast.error("Cập nhật giỏ hàng thất bại", { duration: 4000 });
    },
  });
};
