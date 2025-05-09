"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

export function OrdersChart() {
  // Mock data for order status
  const data = [
    { name: "T2", completed: 45, canceled: 5, pending: 12 },
    { name: "T3", completed: 52, canceled: 7, pending: 15 },
    { name: "T4", completed: 48, canceled: 4, pending: 10 },
    { name: "T5", completed: 60, canceled: 8, pending: 18 },
    { name: "T6", completed: 75, canceled: 6, pending: 20 },
    { name: "T7", completed: 82, canceled: 9, pending: 25 },
    { name: "CN", completed: 65, canceled: 5, pending: 17 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="completed"
          name="Hoàn thành"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="canceled"
          name="Đã hủy"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="pending"
          name="Đang xử lý"
          fill="#f59e0b"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
