"use client";

import { Progress } from "@/components/ui/progress";

export function TopProducts() {
  // Mock data for top products
  const products = [
    {
      name: "Áo thun nam",
      sales: 245,
      percentage: 85,
    },
    {
      name: "Quần jean nữ",
      sales: 190,
      percentage: 65,
    },
    {
      name: "Giày thể thao",
      sales: 175,
      percentage: 60,
    },
    {
      name: "Túi xách thời trang",
      sales: 150,
      percentage: 52,
    },
    {
      name: "Đồng hồ thông minh",
      sales: 120,
      percentage: 41,
    },
  ];

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.sales} sản phẩm
            </p>
          </div>
          <Progress value={product.percentage} className="h-2" />
        </div>
      ))}
    </div>
  );
}
