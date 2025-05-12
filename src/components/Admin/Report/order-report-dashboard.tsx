"use client";
import Chart from "@/components/Common/Chart";
import { Button } from "@/components/ui/button";
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
import { ReportSummary } from "./report-summary";
interface DataPoint {
  time: string;
  completed: number;
  canceled: number;
  pending: number;
}
export default function OrderReportDashboard() {
  const [search, setSearch] = useState({
    type: "week",
  });
  const { data: weeklyData, isLoading } = useQuery({
    queryKey: ["reports", JSON.stringify(search)],
    queryFn: getReport,
  });

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
        <h1 className="text-3xl font-bold tracking-tight">Order Report</h1>
        <p className="text-muted-foreground">
          Order statistics for the current week
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <Button
          className={
            search.type === "week" ? "bg-blue-500 hover:bg-blue-700" : ""
          }
          onClick={() => {
            setSearch({
              type: "week",
            });
          }}
        >
          Order for week
        </Button>
        <Button
          className={
            search.type === "month" ? "bg-blue-500 hover:bg-blue-700" : ""
          }
          onClick={() => {
            setSearch({
              type: "month",
            });
          }}
        >
          Order for month
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ReportSummary
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
                    <Chart<DataPoint>
                      data={weeklyData.metadata}
                      dataKey="completed"
                      dataKeyXAxis="time"
                      color="#22c55e"
                      name="Completed Orders"
                    />
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
                    <Chart
                      data={weeklyData.metadata}
                      dataKey="canceled"
                      dataKeyXAxis="time"
                      color="#ef4444"
                      name="Canceled Orders"
                    />
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
                    <Chart<DataPoint>
                      data={weeklyData.metadata}
                      dataKey="pending"
                      dataKeyXAxis="time"
                      color="#f59e0b"
                      name="Pending Orders"
                    />
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
                  <Chart<DataPoint>
                    data={weeklyData.metadata}
                    dataKey="completed"
                    dataKeyXAxis="time"
                    color="#22c55e"
                    name="Completed Orders"
                    fullSize
                  />
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
                  <Chart<DataPoint>
                    data={weeklyData.metadata}
                    dataKey="canceled"
                    dataKeyXAxis="time"
                    color="#ef4444"
                    name="Canceled Orders"
                    fullSize
                  />
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
                  <Chart<DataPoint>
                    data={weeklyData.metadata}
                    dataKey="pending"
                    dataKeyXAxis="time"
                    color="#f59e0b"
                    name="Pending Orders"
                    fullSize
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
