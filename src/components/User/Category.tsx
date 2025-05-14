"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { ICart, useCart } from "@/context/CartContext";
import { useModal } from "@/context/ModalContext";
import { addToCart, getCategories, getProducts } from "@/lib/api";
import { IProduct } from "@/type";
import { useMutation, useQueries } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Category() {
  const [search, setSearch] = useState<{
    page: number;
    category: string;
  }>({
    page: 1,
    category: "all",
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ["products", search],
        queryFn: () => getProducts(search.page, search.category),
      },
      {
        queryKey: ["categories"],
        queryFn: getCategories,
      },
    ],
  });

  // Extracting the responses
  const [productsResult, categoriesResult] = results;
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
                {categoriesResult.isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {[
                      { _id: "all", name: "Tất cả" },
                      ...categoriesResult.data.metadata,
                    ].map((category, index) => {
                      return (
                        <TabsTrigger
                          className="cursor-pointer"
                          onClick={() => {
                            setSearch({
                              page: 1,
                              category: category._id,
                            });
                          }}
                          key={index}
                          value={category._id}
                        >
                          {category.name}
                        </TabsTrigger>
                      );
                    })}
                  </>
                )}
              </TabsList>
            </div>
            <TabsContent value={search.category} className="mt-6">
              <div>
                {productsResult.isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {productsResult.data.metadata.products.map(
                        (product: IProduct, index: number) => {
                          return <ProductCard product={product} key={index} />;
                        }
                      )}
                    </div>

                    <div className="flex justify-center">
                      {(productsResult.data.metadata.totalItems ?? 0) > 1 &&
                        (productsResult.data.metadata.totalPages ?? 0) > 1 && (
                          <div className="px-6 py-4 flex items-center justify-between border-t">
                            <div className="flex space-x-1 items-end">
                              <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">
                                {`<<`}
                              </button>
                              {(productsResult.data.metadata.totalItems ?? 0) >
                                1 &&
                                (productsResult.data.metadata.totalPages ?? 0) >
                                  1 && (
                                  <div className="flex gap-2 mt-4">
                                    {Array.from(
                                      {
                                        length:
                                          productsResult.data.metadata
                                            .totalPages ?? 0,
                                      },
                                      (_, i) => (
                                        <button
                                          key={i}
                                          onClick={() =>
                                            setSearch &&
                                            setSearch(
                                              (prev: {
                                                page: number;
                                                category: string;
                                              }) => ({
                                                ...prev,
                                                page: i + 1,
                                              })
                                            )
                                          }
                                          className={`px-3 py-1 border rounded text-sm transition cursor-pointer ${
                                            i + 1 ===
                                            Number(
                                              productsResult.data.metadata
                                                .currentPage
                                            )
                                              ? "bg-amber-50 text-amber-700"
                                              : "bg-white hover:bg-gray-50"
                                          }`}
                                        >
                                          {i + 1}
                                        </button>
                                      )
                                    )}
                                  </div>
                                )}

                              <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">
                                {`>>`}
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
// Product Card Component
function ProductCard({ product }: { product: IProduct }) {
  const { user } = useAuth();
  const { setCart, setCountCart } = useCart();
  const { handleOpenLogin } = useModal();
  const t = Cookies.get("userToken") ?? "";
  const mutation = useMutation({
    mutationFn: (data: IProduct) => addToCart(data._id, 1, t),
    onSuccess: (data) => {
      toast.success("Thêm vào giỏ hàng thành công", { duration: 4000 });
      const customData = data.metadata.map((item: ICart) => {
        return {
          product: item.product,
          quantity: item.quantity,
        };
      });
      setCart(customData);
      const totalQuantity = customData.reduce(
        (sum: number, item: ICart) => sum + item.quantity,
        0
      );
      setCountCart(totalQuantity);
    },
    onError: (error) => {
      toast.error("Them gio hang thất bại", { duration: 4000 });
    },
  });
  const handleBuyProduct = (product: IProduct) => {
    if (!user) {
      handleOpenLogin();
      return;
    }
    mutation.mutate(product);
  };
  return (
    <Card className="overflow-hidden">
      <img
        src={
          "https://c.pxhere.com/photos/87/e0/food_cake_on_white-655658.jpg!d"
        }
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
        <Button
          onClick={() => handleBuyProduct(product)}
          className="w-full bg-rose-500 hover:bg-rose-600 cursor-pointer"
        >
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
