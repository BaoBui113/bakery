export const formatGender = (gender: string) => {
  switch (gender) {
    case "male":
      return {
        label: "Nam",
        className: "",
      };
    case "female":
      return { label: "Nữ", className: "" };

    default:
      return { label: gender, className: "" };
  }
};

export const formatStatus = (status: string) => {
  switch (status) {
    case "banned":
      return {
        label: "Bị cấm",
        className: "bg-red-100 text-red-800",
      };
    case "active":
      return {
        label: "Đang hoạt động",
        className: "bg-green-100 text-green-800",
      };
    default:
      return { label: status, className: "bg-gray-100 text-gray-800" };
  }
};
