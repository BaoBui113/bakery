import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

interface CompletedOrdersChartProps<T> {
  data: T[];
  fullSize?: boolean;
  color: string;
  dataKey: string;
  name: string;
  dataKeyXAxis: string;
}

export default function Chart<T>({
  data,
  fullSize = false,
  dataKeyXAxis,
  dataKey,
  color,
  name,
}: CompletedOrdersChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={fullSize ? 350 : 250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={dataKeyXAxis}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        <Bar dataKey={dataKey} name={name} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
