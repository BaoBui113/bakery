"use client";
import { getUserReport } from "@/services/admin/report";

import { CheckCircle } from "lucide-react";

import ReportItem from "./report-item";

import Chart from "@/components/Common/Chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
interface DataPoint {
  time: string;
  total: number;
}
export default function UserReportDashboard() {
  const [search, setSearch] = useState({
    type: "week",
  });
  const { data: dataReport, isLoading } = useQuery({
    queryKey: ["user-register", JSON.stringify(search)],
    queryFn: getUserReport,
  });
  console.log("listReport", dataReport);

  // Calculate totals
  const totalUserWithTime =
    dataReport?.metadata?.data?.reduce((sum, day) => sum + day.total, 0) ?? 0;
  const totalUsersPercentage = Math.round(
    (totalUserWithTime / dataReport?.metadata?.totalUser) * 100
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Report</h1>
        <p className="text-muted-foreground">
          User statistics for the current week
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
          <div className="grid gap-4 grid-cols-2">
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
              title="Total Users"
              total={dataReport?.metadata?.totalUser ?? 0}
            >
              <p className="text-xs text-muted-foreground">Orders this week</p>
            </ReportItem>
            <ReportItem
              Icon={
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </>
              }
              title="Registered Users"
              total={totalUserWithTime}
            >
              <p className="text-xs text-muted-foreground">
                {totalUsersPercentage}% of total orders
              </p>
            </ReportItem>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>User Register</CardTitle>
              <CardDescription>
                This chart shows the number of users registered over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Chart<DataPoint>
                data={dataReport.metadata.data}
                dataKey="total"
                dataKeyXAxis="time"
                color="#22c55e"
                name="Users Registered"
                fullSize
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
