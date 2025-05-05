export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatStatus = (status: string) => {
  switch (status) {
    case "pending":
      return {
        label: "Đang chờ xử lý",
        className: "bg-yellow-100 text-yellow-800",
      };
    case "paid":
      return { label: "Đã xác nhận", className: "bg-blue-100 text-blue-800" };
    case "shipping":
      return {
        label: "Đang giao hàng",
        className: "bg-purple-100 text-purple-800",
      };
    case "delivered":
      return {
        label: "Đã giao hàng",
        className: "bg-green-100 text-green-800",
      };
    case "cancelled":
      return { label: "Đã hủy", className: "bg-red-100 text-red-800" };
    default:
      return { label: status, className: "bg-gray-100 text-gray-800" };
  }
};
