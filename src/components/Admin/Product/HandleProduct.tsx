"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/services/admin/product";
import { ICategory, IProductCustom, IProductForm } from "@/type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên sản phẩm phải có ít nhất 2 ký tự.",
  }),
  category_id: z.string().min(1, {
    message: "Danh mục không được để trống.",
  }),
  description: z.string().min(10, {
    message: "Mô tả phải có ít nhất 10 ký tự.",
  }),
  price: z.coerce.number().positive({
    message: "Giá phải là số dương.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "Số lượng phải là số nguyên không âm.",
  }),
});
export default function HandleProduct({
  categories,
  isLoading,
  setOpen,
  detailProduct,
  setDetailProduct,
}: {
  categories: ICategory[];
  isLoading: boolean;
  setOpen: (open: boolean) => void;
  detailProduct?: IProductCustom;
  setDetailProduct: (detailProduct: IProductCustom | undefined) => void;
}) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: IProductForm) => createProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Tạo sản phẩm thành công", { duration: 4000 });
      form.reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Tạo sản phẩm thất bại", { duration: 4000 });
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: (data: IProductForm) => updateProduct(data, detailProduct!._id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Cập nhật sản phẩm thành công", { duration: 4000 });
      form.reset();
      setOpen(false);
      setDetailProduct(undefined);
    },
    onError: (error) => {
      toast.error("Cập nhật sản phẩm thất bại", { duration: 4000 });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!detailProduct) {
      mutation.mutate({
        name: values.name,
        category_id: values.category_id,
        description: values.description,
        price: values.price,
        stock: values.stock,
      });
      return;
    }
    mutationUpdate.mutate({
      name: values.name,
      category_id: values.category_id,
      description: values.description,
      price: values.price,
      stock: values.stock,
    });
  }

  useEffect(() => {
    if (detailProduct) {
      form.setValue("name", detailProduct.name);
      form.setValue("category_id", detailProduct.category._id);
      form.setValue("description", detailProduct.description);
      form.setValue("price", detailProduct.price);
      form.setValue("stock", detailProduct.stock);
    }
  }, [detailProduct, form]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle>Create Product</DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bánh Su Kem Sinh Nhật Mâm Xôi"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Nhập tên sản phẩm của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục sản phẩm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Đang tải danh mục...
                      </SelectItem>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Chọn danh mục cho sản phẩm.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Sản phẩm độc quyền nhà bakery shop"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Mô tả chi tiết về sản phẩm.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá (VNĐ)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="400000" {...field} />
                </FormControl>
                <FormDescription>Nhập giá sản phẩm (VNĐ).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  Nhập số lượng sản phẩm trong kho.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Lưu sản phẩm</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
