"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

interface DataPoint {
  day: string;
  completed: number;
  canceled: number;
  pending: number;
}

interface PendingOrdersChartProps {
  data: DataPoint[];
  fullSize?: boolean;
}

export function PendingOrdersChart({
  data,
  fullSize = false,
}: PendingOrdersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={fullSize ? 350 : 250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        <Bar
          dataKey="pending"
          name="Pending Orders"
          fill="#f59e0b"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
