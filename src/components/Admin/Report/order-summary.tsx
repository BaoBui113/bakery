import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderSummaryProps {
  totalOrders: number;
  totalCompleted: number;
  totalCanceled: number;
  totalPending: number;
}

export function OrderSummary({
  totalOrders,
  totalCompleted,
  totalCanceled,
  totalPending,
}: OrderSummaryProps) {
  // Calculate percentages
  const completedPercentage = Math.round((totalCompleted / totalOrders) * 100);
  const canceledPercentage = Math.round((totalCanceled / totalOrders) * 100);
  const pendingPercentage = Math.round((totalPending / totalOrders) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">Orders this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Orders
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCompleted}</div>
          <p className="text-xs text-muted-foreground">
            {completedPercentage}% of total orders
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Canceled Orders</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCanceled}</div>
          <p className="text-xs text-muted-foreground">
            {canceledPercentage}% of total orders
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Clock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPending}</div>
          <p className="text-xs text-muted-foreground">
            {pendingPercentage}% of total orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
