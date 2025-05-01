"use client";
import { products } from "@/app/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Category() {
  const [search, setSearch] = useState({
    page: 1,
    category: "all",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search.page, search.category),
  });
  console.log("In ra data", data);
  return (
    <>
      {/* Categories Section */}
      <section className="py-12 flex flex-col items-center" id="products">
        <div className="container space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Danh mục sản phẩm
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Chúng tôi cung cấp nhiều loại bánh ngọt khác nhau để phục vụ mọi
              nhu cầu của bạn.
            </p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="cakes">Bánh kem</TabsTrigger>
                <TabsTrigger value="pastries">Bánh ngọt</TabsTrigger>
                <TabsTrigger value="cookies">Bánh quy</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="cakes" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products
                  .filter((p) => p.category === "cake")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="pastries" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products
                  .filter((p) => p.category === "pastry")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="cookies" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products
                  .filter((p) => p.category === "cookie")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
// Product Card Component
function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Card className="overflow-hidden">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="aspect-square w-full object-cover"
        width={200}
        height={200}
      />
      <CardContent className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 font-bold text-rose-500">
          {product.price.toLocaleString("vi-VN")} đ
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-rose-500 hover:bg-rose-600">
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
