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
import {
  createProduct,
  deleteImage,
  updateProduct,
  uploadImage,
} from "@/services/admin/product";
import { ICategory, IProductCustom, IProductForm } from "@/type";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ProductImagePreview from "./ProductImagePreview";

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
  //   image: z.string().optional(),
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
  const [image, setImage] = useState({
    publicId: "",
    url: "",
  });

  const queryClient = useQueryClient();
  const form = useForm<
    z.infer<typeof formSchema>,
    any,
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: "",
      description: "",
      price: 0,
      stock: 0,
      //   image: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: IProductForm) => createProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Tạo sản phẩm thành công", { duration: 4000 });
      form.reset();
      setOpen(false);
      setImage({
        publicId: "",
        url: "",
      });
    },
    onError: (error) => {
      toast.error("Tạo sản phẩm thất bại", { duration: 4000 });
    },
  });
  const mutationUploadImage: UseMutationResult<any, Error, FormData, unknown> =
    useMutation({
      mutationFn: (data: FormData) => uploadImage(data),
      onSuccess: (data) => {
        toast.success("Tải lên hình ảnh thành công", { duration: 4000 });
      },
      onError: (error) => {
        toast.error("Tải lên hình ảnh thất bại", { duration: 4000 });
      },
    });

  const mutationDeleteImage = useMutation({
    mutationFn: (publicId: string) => deleteImage(publicId),
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
  const handleDeleteImage = async (e) => {
    e.preventDefault();

    try {
      mutationDeleteImage.mutate(image.publicId);
      setImage({
        publicId: "",
        url: "",
      });

      toast.success("Xóa hình ảnh thành công", { duration: 4000 });
    } catch (error) {
      toast.error("Xóa hình ảnh thất bại", { duration: 4000 });
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await mutationUploadImage.mutateAsync(formData);
      setImage({
        publicId: res.publicId,
        url: res.url,
      });
    } catch (error) {
      toast.error("Tải lên hình ảnh thất bại", { duration: 4000 });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!detailProduct) {
      mutation.mutate({
        name: values.name,
        category_id: values.category_id,
        description: values.description,
        price: values.price,
        stock: values.stock,
        image: image,
      });

      return;
    }
    mutationUpdate.mutate({
      name: values.name,
      category_id: values.category_id,
      description: values.description,
      price: values.price,
      stock: values.stock,
      image: image,
    });
  }
  console.log("detailProduct", detailProduct);

  useEffect(() => {
    if (detailProduct) {
      form.setValue("name", detailProduct.name);
      form.setValue("category_id", detailProduct.category._id);
      form.setValue("description", detailProduct.description);
      form.setValue("price", detailProduct.price);
      form.setValue("stock", detailProduct.stock);
      setImage({
        publicId: detailProduct.image?.publicId || "",
        url: detailProduct.image?.url || "",
      });
    } else {
      form.reset();
      setImage({
        publicId: "",
        url: "",
      });
    }
  }, [detailProduct, form]);

  return (
    <DialogContent className="sm:max-w-[425px] overflow-y-auto">
      <DialogTitle>
        {detailProduct ? "Edit product" : "Create product"}
      </DialogTitle>
      <Form {...form}>
        <form
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 overflow-y-auto"
        >
          <FormItem>
            <FormLabel>Hình ảnh sản phẩm (Tùy chọn)</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  id="product-image-upload"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file) {
                      handleUploadImage(file);
                    }
                  }}
                />
                <label
                  htmlFor="product-image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer border-gray-300 hover:border-gray-400 transition-colors"
                >
                  {mutationUploadImage.status === "pending" ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                    </div>
                  ) : image.url ? (
                    <ProductImagePreview
                      imageUrl={image.url}
                      onDelete={(e) => {
                        handleDeleteImage(e);
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm text-gray-600">
                        Vui lòng chọn hình ảnh
                      </span>
                      <span className="text-xs text-gray-500">
                        (Nhấp vào đây để tải lên)
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </FormControl>

            <FormDescription>
              Tải lên hình ảnh cho sản phẩm (không bắt buộc).
            </FormDescription>
            <FormMessage />
          </FormItem>
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
