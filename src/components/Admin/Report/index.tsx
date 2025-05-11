"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReport } from "@/services/admin/report";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CanceledOrdersChart } from "./canceled-orders-chart";
import { CompletedOrdersChart } from "./completed-orders-chart";
import { OrderSummary } from "./order-summary";
import { PendingOrdersChart } from "./pending-orders-chart";

export default function OrderReportDashboard() {
  const [search, setSearch] = useState({
    type: "week",
  });
  const { data: weeklyData, isLoading } = useQuery({
    queryKey: ["reports", JSON.stringify(search)],
    queryFn: getReport,
  });
  console.log("listReport", weeklyData);

  // Mock data for the week
  //   const weeklyData = [
  //     { day: "Monday", completed: 45, canceled: 5, pending: 12 },
  //     { day: "Tuesday", completed: 52, canceled: 7, pending: 15 },
  //     { day: "Wednesday", completed: 48, canceled: 4, pending: 10 },
  //     { day: "Thursday", completed: 60, canceled: 8, pending: 18 },
  //     { day: "Friday", completed: 75, canceled: 6, pending: 20 },
  //     { day: "Saturday", completed: 82, canceled: 9, pending: 25 },
  //     { day: "Sunday", completed: 65, canceled: 5, pending: 17 },
  //   ];

  // Calculate totals
  const totalCompleted =
    weeklyData?.metadata?.reduce((sum, day) => sum + day.completed, 0) ?? 0;
  const totalCanceled =
    weeklyData?.metadata?.reduce((sum, day) => sum + day.canceled, 0) ?? 0;
  const totalPending =
    weeklyData?.metadata?.reduce((sum, day) => sum + day.pending, 0) ?? 0;
  const totalOrders = totalCompleted + totalCanceled + totalPending;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Weekly Order Report
        </h1>
        <p className="text-muted-foreground">
          Order statistics for the current week
        </p>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <OrderSummary
            totalOrders={totalOrders}
            totalCompleted={totalCompleted}
            totalCanceled={totalCanceled}
            totalPending={totalPending}
          />
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Charts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Orders</CardTitle>
                    <CardDescription>
                      Orders successfully delivered this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CompletedOrdersChart data={weeklyData.metadata} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Canceled Orders</CardTitle>
                    <CardDescription>
                      Orders that were canceled this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CanceledOrdersChart data={weeklyData.metadata} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>
                      Orders awaiting processing or delivery
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PendingOrdersChart data={weeklyData.metadata} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Orders</CardTitle>
                  <CardDescription>
                    Orders successfully delivered this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <CompletedOrdersChart data={weeklyData.metadata} fullSize />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="canceled">
              <Card>
                <CardHeader>
                  <CardTitle>Canceled Orders</CardTitle>
                  <CardDescription>
                    Orders that were canceled this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <CanceledOrdersChart data={weeklyData.metadata} fullSize />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Orders</CardTitle>
                  <CardDescription>
                    Orders awaiting processing or delivery
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <PendingOrdersChart data={weeklyData.metadata} fullSize />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
