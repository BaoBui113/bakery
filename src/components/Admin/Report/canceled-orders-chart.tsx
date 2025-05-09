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

interface CanceledOrdersChartProps {
  data: DataPoint[];
  fullSize?: boolean;
}

export function CanceledOrdersChart({
  data,
  fullSize = false,
}: CanceledOrdersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={fullSize ? 350 : 250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        <Bar
          dataKey="canceled"
          name="Canceled Orders"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
