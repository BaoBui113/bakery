"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

export function RevenueChart() {
  // Mock data for revenue
  const data = [
    { name: "Tháng 1", revenue: 4000 },
    { name: "Tháng 2", revenue: 3000 },
    { name: "Tháng 3", revenue: 5000 },
    { name: "Tháng 4", revenue: 4500 },
    { name: "Tháng 5", revenue: 6000 },
    { name: "Tháng 6", revenue: 5500 },
    { name: "Tháng 7", revenue: 7000 },
    { name: "Tháng 8", revenue: 8000 },
    { name: "Tháng 9", revenue: 7500 },
    { name: "Tháng 10", revenue: 9000 },
    { name: "Tháng 11", revenue: 8500 },
    { name: "Tháng 12", revenue: 10000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Doanh thu"]} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#7c3aed"
          fill="url(#colorRevenue)"
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}
