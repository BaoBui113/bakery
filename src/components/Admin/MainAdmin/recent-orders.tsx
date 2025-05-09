"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RecentOrders() {
  // Mock data for recent orders
  const orders = [
    {
      id: "ORD-1234",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      amount: "$125.00",
      status: "completed",
      date: "30 phút trước",
    },
    {
      id: "ORD-1235",
      customer: "Trần Thị B",
      email: "tranthib@example.com",
      amount: "$79.99",
      status: "processing",
      date: "2 giờ trước",
    },
    {
      id: "ORD-1236",
      customer: "Lê Văn C",
      email: "levanc@example.com",
      amount: "$249.99",
      status: "completed",
      date: "3 giờ trước",
    },
    {
      id: "ORD-1237",
      customer: "Phạm Thị D",
      email: "phamthid@example.com",
      amount: "$45.50",
      status: "canceled",
      date: "5 giờ trước",
    },
    {
      id: "ORD-1238",
      customer: "Hoàng Văn E",
      email: "hoangvane@example.com",
      amount: "$199.99",
      status: "processing",
      date: "8 giờ trước",
    },
  ];

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`/placeholder.svg?height=36&width=36`}
              alt={order.customer}
            />
            <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.email}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{order.amount}</p>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                order.status === "completed" &&
                  "border-green-500 text-green-500",
                order.status === "processing" &&
                  "border-blue-500 text-blue-500",
                order.status === "canceled" && "border-red-500 text-red-500"
              )}
            >
              {order.status === "completed" && "Hoàn thành"}
              {order.status === "processing" && "Đang xử lý"}
              {order.status === "canceled" && "Đã hủy"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
