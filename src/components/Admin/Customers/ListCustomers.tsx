"use client";
import { CommonTable } from "@/components/Common/Table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatGender, formatStatus } from "@/helper";
import { useHandleCustomer } from "@/hook/useCustomer";
import { getCustomers } from "@/services/admin/customer";
import { IUser } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { TableFilter } from "../Order/TableFilter";
import ModalCustomer from "./ModalCustomer";

export default function ListCustomers() {
  const [search, setSearch] = useState({
    field: "",
    value: "",
    page: 1,
    type: "active",
  });
  const { data: listCustomers, isLoading } = useQuery({
    queryKey: ["customers", JSON.stringify(search)],
    queryFn: getCustomers,
  });

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<IUser | null>(null);
  const { mutate: handleCustomer } = useHandleCustomer();

  const handleCustomerBannedOrUnBanned = (userId: string, type: string) => {
    handleCustomer(
      { userId, type },
      {
        onSuccess: () => {
          toast.success("Cập nhật user thành công", { duration: 4000 });
        },
        onError: () => {
          toast.error("Cập nhật user thất bại", { duration: 4000 });
        },
      }
    );
  };

  const filterOptions = [
    { key: "name", label: "Tên khách hàng" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Số điện thoại" },
  ];

  const handleFilter = (field: string, value: string) => {
    setSearch((prev) => {
      return {
        ...prev,
        field,
        value,
        page: 1,
      };
    });
  };

  const clearFilters = () => {
    setSearch((prev) => {
      return {
        ...prev,
        field: "",
        value: "",
        page: 1,
      };
    });
  };

  const handleUser = (type: string) => {
    setSearch((prev) => {
      return {
        ...prev,
        type: type,
      };
    });
  };

  console.log("listCustomers", listCustomers);
  const columns = [
    {
      key: "name",
      header: "Tên khách hàng",
      render: (user: IUser) => {
        return <span>{user.name}</span>;
      },
    },
    {
      key: "email",
      header: "Email",
      render: (user: IUser) => {
        return <span>{user.email}</span>;
      },
    },

    {
      key: "phone",
      header: "Số điện thoại",
      render: (user: IUser) => {
        return <span>{user.phoneNumber}</span>;
      },
    },

    {
      key: "gender",
      header: "Giới tính",
      render: (user: IUser) => {
        const { label, className } = formatGender(user.gender);
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm text-nowrap ${className}`}
          >
            {label}
          </span>
        );
      },
    },

    {
      key: "Status",
      header: "Trạng thái",
      render: (user: IUser) => {
        const { label, className } = formatStatus(user.type);
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm text-nowrap ${className}`}
          >
            {label}
          </span>
        );
      },
    },

    {
      key: "action",
      header: "Hành động",
      render: (user: IUser) => {
        return (
          <TooltipProvider>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setCustomer(user);
                      }}
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer p-1.5 rounded-full hover:bg-yellow-50"
                      aria-label="Chỉnh sửa"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chỉnh sửa</p>
                </TooltipContent>
              </Tooltip>
              <>
                {user.type === "active" ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          handleCustomerBannedOrUnBanned(user._id, "banned");
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1.5 rounded-full hover:bg-red-50"
                        aria-label="Hủy"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Banned</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          handleCustomerBannedOrUnBanned(user._id, "active");
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1.5 rounded-full hover:bg-red-50"
                        aria-label="Hủy"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Unbanned</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </>
            </div>
          </TooltipProvider>
        );
      },
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableFilter
        options={filterOptions}
        onFilter={handleFilter}
        onClear={clearFilters}
      />
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => handleUser("active")}
          className={`cursor-pointer ${
            search.type === "active"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-black"
          }`}
        >
          Active
        </Button>
        <Button
          className={`cursor-pointer ${
            search.type === "banned"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-black"
          }`}
          onClick={() => handleUser("banned")}
        >
          Banned
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CommonTable
            currentPage={listCustomers?.metadata?.currentPage ?? 1}
            columns={columns}
            totalItems={listCustomers?.metadata?.totalItems ?? 0}
            totalPages={listCustomers?.metadata?.totalPages ?? 0}
            setSearch={setSearch}
            data={listCustomers?.metadata?.users ?? []}
          />
        )}
      </div>
      <ModalCustomer customer={customer} setOpen={setOpen} />
    </Dialog>
  );
}
