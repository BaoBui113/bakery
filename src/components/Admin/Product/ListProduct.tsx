"use client";
import { CommonTable } from "@/components/Common/Table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteProduct } from "@/hook/useDeleteProduct";
import { getCategories } from "@/services/admin/category";
import { getProducts } from "@/services/admin/product";
import { ICategory, IProduct, IProductCustom } from "@/type";
import { useQueries } from "@tanstack/react-query";
import { CakeSlice, Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import HandleProduct from "./HandleProduct";

export default function ProductsComponent() {
  const [open, setOpen] = useState(false);
  const { mutate: deleteProduct } = useDeleteProduct();

  const [detailProduct, setDetailProduct] = useState<
    IProductCustom | undefined
  >(undefined);
  const [search, setSearch] = useState({
    page: 1,
    category: "all",
    keyword: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const results = useQueries({
    queries: [
      {
        queryKey: ["products", JSON.stringify(search)],
        queryFn: getProducts,
      },
      {
        queryKey: ["categories"],
        queryFn: getCategories,
      },
    ],
  });

  const [productsQuery, categoriesQuery] = results;
  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  const columns = [
    {
      key: "name",
      header: "Sản phẩm",
      render: (product: IProductCustom) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-md bg-amber-100 flex items-center justify-center">
            <CakeSlice className="h-5 w-5 text-amber-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-xs text-gray-500">#{product.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Danh mục",
      render: (product: IProductCustom) => <span>{product.category.name}</span>,
    },
    { key: "price", header: "Giá" },
    { key: "stock", header: "Tồn kho" },
    {
      key: "status",
      header: "Trạng thái",
      render: (product: IProductCustom) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.status === "Còn hàng"
              ? "bg-green-100 text-green-800"
              : product.status === "Sắp hết"
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Thao tác",
      render: (product: IProductCustom) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setDetailProduct(product);
              console.log("product", product.image);

              setOpen(true);
            }}
            className="text-amber-600 hover:text-amber-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);

        if (!isOpen) {
          setDetailProduct(undefined);
        }
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-1" />
              Thêm sản phẩm
            </button>
          </DialogTrigger>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <input
                  onChange={(e) => {
                    setSearch((prev) => ({
                      ...prev,
                      page: 1,
                      keyword: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <select
                className="px-4 py-2 border rounded-md bg-white"
                onChange={(e) => {
                  const value = e.target.value;

                  const [sortBy, sortOrder] = value.split("-");
                  setSearch((prev) => ({
                    ...prev,
                    page: 1,
                    sortBy,
                    sortOrder,
                  }));
                }}
              >
                <option value="createdAt-desc">Sắp xếp theo</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
                <option value="price-asc">Giá thấp - cao</option>
                <option value="price-desc">Giá cao - thấp</option>
                <option value="stock-desc">Tồn kho nhiều - ít</option>
                <option value="stock-asc">Tồn kho ít - nhiều</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categoriesQuery.isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {[
                    { _id: "all", name: "Tat ca" },
                    ...categoriesQuery.data.metadata,
                  ].map((item: ICategory, index: number) => {
                    return (
                      <button
                        onClick={() => {
                          setSearch((prev) => ({
                            ...prev,
                            page: 1,
                            category: item._id,
                          }));
                        }}
                        key={index}
                        className={`px-3 cursor-pointer py-1 rounded-full text-sm whitespace-nowrap ${
                          item._id === search.category
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {productsQuery.isLoading ? (
            <div className="p-4">Loading...</div>
          ) : (
            <CommonTable
              currentPage={productsQuery.data.metadata.currentPage}
              totalItems={productsQuery.data.metadata.totalItems}
              totalPages={productsQuery.data.metadata.totalPages}
              columns={columns}
              setSearch={setSearch}
              data={productsQuery.data.metadata.products.map(
                (item: IProduct, index: number) => {
                  return {
                    id: index + 1,
                    name: item.name,
                    category: {
                      name: item.category_id.name,
                      _id: item.category_id._id,
                    },
                    _id: item._id,
                    description: item.description,
                    price: item.price,
                    stock: item.stock,
                    status: item.stock > 0 ? "Còn hàng" : "Hết hàng",
                    image: item.image,
                  };
                }
              )}
            />
          )}
        </div>
      </div>
      <HandleProduct
        setDetailProduct={setDetailProduct}
        detailProduct={detailProduct}
        setOpen={setOpen}
        isLoading={categoriesQuery.isLoading}
        categories={categoriesQuery?.data?.metadata ?? []}
      />
    </Dialog>
  );
}
