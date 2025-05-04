"use client";
import { CommonTable } from "@/components/Common/Table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPrice, formatStatus } from "@/helper/formatPrice";
import { getOrders } from "@/services/admin/order";
import { IOrder } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Check, Pencil, X } from "lucide-react";
export default function ListOrders() {
  const { data: listOrders, isLoading } = useQuery({
    queryKey: ["orders", JSON.stringify({ page: 1 })],
    queryFn: getOrders,
  });
  console.log("data", listOrders);
  const columns = [
    {
      key: "productId",
      header: "Tên sản phẩm",
      render: (order: IOrder) => {
        return <span>{order.productId.name}</span>;
      },
    },
    {
      key: "category_id",
      header: "Tên danh mục",
      render: (order: IOrder) => {
        return <span>{order.productId.category_id.name}</span>;
      },
    },
    {
      key: "userId",
      header: "Người đặt hàng",
      render: (order: IOrder) => {
        return <span>{order.userId.name}</span>;
      },
    },
    {
      key: "phone",
      header: "Số điện thoại",
      render: (order: IOrder) => {
        return <span>{order.userId.phoneNumber}</span>;
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
        return (
          <span>{formatPrice(order.productId.price * order.quantity)}</span>
        );
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
                  <button
                    className="text-yellow-500 hover:text-yellow-700 cursor-pointer p-1.5 rounded-full hover:bg-yellow-50"
                    aria-label="Chỉnh sửa"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chỉnh sửa</p>
                </TooltipContent>
              </Tooltip>

              {order.status === "pending" && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
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

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
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
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <CommonTable
            currentPage={1}
            totalItems={1}
            totalPages={1}
            columns={columns}
            //   setSearch={setSearch}
            //   data={productsQuery.data.metadata.products.map(
            // 	(item: IProduct, index: number) => {
            // 	  return {
            // 		id: index + 1,
            // 		name: item.name,
            // 		category: {
            // 		  name: item.category_id.name,
            // 		  _id: item.category_id._id,
            // 		},
            // 		_id: item._id,
            // 		description: item.description,
            // 		price: item.price,
            // 		stock: item.stock,
            // 		status: item.stock > 0 ? "Còn hàng" : "Hết hàng",
            // 	  };
            // 	}
            //   )}
            data={listOrders?.metadata ?? []}
          />
        )}
      </div>
    </>
  );
}
