"use client";
import { CommonTable } from "@/components/Common/Table";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPrice, formatStatus } from "@/helper/formatPrice";
import { useCancelCart, useConfirmCart } from "@/hook/useCart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrders } from "@/services/admin/order";
import { IOrder, IOrderForm } from "@/type";
import { Dialog } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import ModalOrder from "./ModalOrder";
import { TableFilter } from "./TableFilter";

export default function ListOrders() {
  const [search, setSearch] = useState<{
    field: string;
    value: string;
    page: number;
  }>({
    field: "",
    value: "",
    page: 1,
  });
  const [orderDetail, setOrderDetail] = useState<IOrderForm | null>(null);
  const [open, setOpen] = useState(false);
  const { data: listOrders, isLoading } = useQuery({
    queryKey: ["orders", JSON.stringify(search)],
    queryFn: getOrders,
  });
  const { mutate: handleConfirmCart } = useConfirmCart();
  const { mutate: handleCancel } = useCancelCart();
  const handleFilter = (field: string, value: string) => {
    setSearch({
      field,
      value,
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearch({
      field: "",
      value: "",
      page: 1,
    });
  };

  const filterOptions = [
    { key: "product.name", label: "Tên sản phẩm" },
    { key: "category.name", label: "Tên danh mục" },
    { key: "user.name", label: "Người đặt hàng" },
    { key: "user.phoneNumber", label: "Số điện thoại" },
  ];
  const filterStatus = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Đang chờ xử lý" },
    { key: "paid", label: "Đã xác nhận" },
    { key: "cancelled", label: "Đã hủy" },
  ];

  const columns = [
    {
      key: "productId",
      header: "Tên sản phẩm",
      render: (order: IOrder) => {
        return <span>{order.product.name}</span>;
      },
    },
    {
      key: "category_id",
      header: "Tên danh mục",
      render: (order: IOrder) => {
        return <span>{order.category.name}</span>;
      },
    },
    {
      key: "userId",
      header: "Người đặt hàng",
      render: (order: IOrder) => {
        return <span>{order.user.name}</span>;
      },
    },
    {
      key: "phone",
      header: "Số điện thoại",
      render: (order: IOrder) => {
        return <span>{order.user.phoneNumber}</span>;
      },
    },
    {
      key: "quantity",
      header: "Số lượng",
      render: (order: IOrder) => {
        return <span>{order.quantity}</span>;
      },
    },
    {
      key: "totalPrice",
      header: "Tổng tiền",
      render: (order: IOrder) => {
        return <span>{formatPrice(order.product.price * order.quantity)}</span>;
      },
    },
    {
      key: "status",
      header: "Trạng thái",
      render: (order: IOrder) => {
        const { label, className } = formatStatus(order.status);
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium text-nowrap ${className}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Hành động",
      render: (order: IOrder) => {
        return (
          <TooltipProvider>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setOrderDetail({
                          orderId: order._id,
                          userId: order.user._id,
                          quantity: order.quantity,
                        });
                      }}
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer p-1.5 rounded-full hover:bg-yellow-50"
                      aria-label="Chỉnh sửa"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chỉnh sửa</p>
                </TooltipContent>
              </Tooltip>
              {order.status === "pending" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() =>
                        handleConfirmCart({
                          orderId: order._id,
                          userId: order.user._id,
                        })
                      }
                      className="text-blue-500 hover:text-blue-700 cursor-pointer p-1.5 rounded-full hover:bg-blue-50"
                      aria-label="Xác nhận"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Xác nhận</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {order.status !== "cancelled" && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          handleCancel({
                            orderId: order._id,
                            userId: order.user._id,
                          })
                        }
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1.5 rounded-full hover:bg-red-50"
                        aria-label="Hủy"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hủy</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
          </TooltipProvider>
        );
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full flex gap-4">
        <TableFilter
          options={filterOptions}
          onFilter={handleFilter}
          onClear={clearFilters}
        />
        <Select
          onValueChange={(value) => {
            setSearch((prev) => ({
              ...prev,
              field: "status",
              value: value === "all" ? "" : value,
              page: 1,
            }));
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn trường lọc" />
          </SelectTrigger>
          <SelectContent>
            {filterStatus.map((option, index) => (
              <SelectItem key={index} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <CommonTable
            currentPage={listOrders?.metadata?.currentPage ?? 1}
            columns={columns}
            totalItems={listOrders?.metadata?.totalItems ?? 0}
            totalPages={listOrders?.metadata?.totalPages ?? 0}
            setSearch={setSearch}
            data={listOrders?.metadata?.items ?? []}
          />
        )}
      </div>
      {orderDetail && (
        <ModalOrder setOpen={setOpen} open={open} orderDetail={orderDetail} />
      )}
    </Dialog>
  );
}
