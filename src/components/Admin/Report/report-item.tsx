import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function ReportItem({
  title,
  total,
  children,
  Icon,
}: {
  title: string;
  total: number;
  children: React.ReactNode;
  Icon: any;
}) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          {children}
        </CardContent>
      </Card>
    </>
  );
}
