import { removeFromCart, updateCart } from "@/lib/api";
import {
  cancelOrders,
  confirmOrders,
  editQuantityOrders,
} from "@/services/admin/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useConfirmCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, userId }: { orderId: string; userId: string }) =>
      confirmOrders(orderId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Xác nhận đơn hàng thành công", { duration: 4000 });
    },
    onError: () => {
      toast.error("Xác nhận đơn hàng thất bại", { duration: 4000 });
    },
  });
};

export const useCancelCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, userId }: { orderId: string; userId: string }) =>
      cancelOrders(orderId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Hủy đơn hàng thành công", { duration: 4000 });
    },
    onError: () => {
      toast.error("Hủy đơn hàng thất bại", { duration: 4000 });
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

export const useEditQuantityCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      userId,
      newQuantity,
    }: {
      orderId: string;
      userId: string;
      newQuantity: number;
    }) => editQuantityOrders(orderId, userId, newQuantity),
    onSuccess: () => {
      toast.success("Cập nhật giỏ hàng thành công", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Cập nhật giỏ hàng thất bại", { duration: 4000 });
    },
  });
};
