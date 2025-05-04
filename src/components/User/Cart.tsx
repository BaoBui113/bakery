"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ICart, useCart } from "@/context/CartContext";
import { useDeleteCart, useUpdateCart } from "@/hook/useCart";
import { useCheckout } from "@/hook/useOrder";

import Cookies from "js-cookie";
import { MinusIcon, PlusIcon, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { cart, setCart, setCountCart } = useCart();
  const { mutate: removeCart } = useDeleteCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: checkoutOrder } = useCheckout();
  const removeItem = (id: string) => {
    const t = Cookies.get("userToken");
    if (t) {
      removeCart(
        { id, token: t },
        {
          onSuccess: () => {
            const updatedCart = cart.filter(
              (item: ICart) => item.product._id !== id
            );
            setCountCart(
              updatedCart.reduce(
                (sum: number, item: ICart) => sum + item.quantity,
                0
              )
            );
            setCart(updatedCart);
            console.log("Item removed successfully");
          },
          onError: () => {
            toast.error("Xóa sản phẩm thất bại", {
              duration: 4000,
            });
          },
        }
      );
    }
  };

  const handleCheckout = () => {
    const token = Cookies.get("userToken");
    if (!token) return;
    checkoutOrder(
      { token },
      {
        onSuccess: () => {
          setCart([]);
          setCountCart(0);
        },
      }
    );
  };

  const handleUpdateCart = async (id: string, quantity: number) => {
    const token = Cookies.get("userToken");
    if (quantity < 0) return;
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    if (!token) return;
    updateCart({
      id,
      quantity,
      token,
    });
    const updatedCart = cart.map((item: ICart) =>
      item.product._id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    setCountCart(
      updatedCart.reduce((sum: number, item: ICart) => sum + item.quantity, 0)
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" />
        Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Button
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart?.map((item: ICart, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            "https://c.pxhere.com/photos/87/e0/food_cake_on_white-655658.jpg!d"
                          }
                          alt={item?.product?.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">
                          {item?.product?.name}
                        </h3>

                        <p className="font-semibold text-lg">
                          {formatPrice(item?.product?.price)}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end justify-between gap-2">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => {
                              handleUpdateCart(
                                item.product._id,
                                item.quantity - 1
                              );
                            }}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item?.quantity}
                            readOnly
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            onClick={() => {
                              handleUpdateCart(
                                item.product._id,
                                item.quantity + 1
                              );
                            }}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-8 px-2"
                          onClick={() => removeItem(item.product._id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Phí vận chuyển
                    </span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-4"
                    size="lg"
                  >
                    Tiến hành thanh toán
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/");
                    }}
                    variant="outline"
                    className="w-full cursor-pointer"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
