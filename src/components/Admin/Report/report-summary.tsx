import { CheckCircle, Clock, XCircle } from "lucide-react";
import ReportItem from "./report-item";

interface OrderSummaryProps {
  totalOrders: number;
  totalCompleted: number;
  totalCanceled: number;
  totalPending: number;
}

export function ReportSummary({
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
      <ReportItem
        Icon={
          <>
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
          </>
        }
        title="Total Orders"
        total={totalOrders}
      >
        <p className="text-xs text-muted-foreground">Orders this week</p>
      </ReportItem>

      <ReportItem
        Icon={
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </>
        }
        title="Completed Orders"
        total={totalCompleted}
      >
        <p className="text-xs text-muted-foreground">
          {completedPercentage}% of total orders
        </p>
      </ReportItem>
      <ReportItem
        Icon={
          <>
            <XCircle className="h-4 w-4 text-red-500" />
          </>
        }
        title="Canceled Orders"
        total={totalCanceled}
      >
        <p className="text-xs text-muted-foreground">
          {canceledPercentage}% of total orders
        </p>
      </ReportItem>

      <ReportItem
        Icon={
          <>
            <Clock className="h-4 w-4 text-amber-500" />
          </>
        }
        title="Pending Orders"
        total={totalPending}
      >
        <p className="text-xs text-muted-foreground">
          {pendingPercentage}% of total orders
        </p>
      </ReportItem>
    </div>
  );
}
