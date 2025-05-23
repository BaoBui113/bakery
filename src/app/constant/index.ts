import {
  BarChart3,
  CakeSlice,
  ClipboardList,
  Home,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
export const navItems = [
  { name: "Trang chủ", href: "/admin", icon: Home },
  { name: "Sản phẩm", href: "/admin/products", icon: CakeSlice },
  { name: "Đơn hàng", href: "/admin/orders", icon: ShoppingCart },
  { name: "Khách hàng", href: "/admin/customers", icon: Users },

  { name: "Báo cáo", href: "/admin/reports", icon: BarChart3 },
  { name: "Công thức", href: "/admin/recipes", icon: ClipboardList },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];
export const categories = [
  "Tất cả",
  "Bánh Ngọt",
  "Bánh Mì",
  "Bánh Kem",
  "Bánh Sinh Nhật",
  "Bánh Mặn",
];

export const products = [
  {
    id: 1,
    name: "Bánh kem chocolate",
    description: "Bánh kem chocolate thơm ngon với lớp kem mịn màng.",
    price: 350000,
    image: "/placeholder.svg?height=200&width=200",
    category: "cake",
  },
  {
    id: 2,
    name: "Bánh cupcake vanilla",
    description: "Bánh cupcake vanilla mềm mịn với lớp kem bơ.",
    price: 35000,
    image: "/placeholder.svg?height=200&width=200",
    category: "pastry",
  },
  {
    id: 3,
    name: "Bánh quy bơ",
    description: "Bánh quy bơ giòn tan với hương vị đậm đà.",
    price: 25000,
    image: "/placeholder.svg?height=200&width=200",
    category: "cookie",
  },
  {
    id: 4,
    name: "Bánh kem dâu tây",
    description: "Bánh kem dâu tây tươi ngon với lớp kem mịn màng.",
    price: 380000,
    image: "/placeholder.svg?height=200&width=200",
    category: "cake",
  },
  {
    id: 5,
    name: "Bánh táo",
    description: "Bánh táo thơm ngon với nhân táo tươi.",
    price: 45000,
    image: "/placeholder.svg?height=200&width=200",
    category: "pastry",
  },
  {
    id: 6,
    name: "Bánh quy chocolate chip",
    description: "Bánh quy chocolate chip giòn tan với nhiều miếng chocolate.",
    price: 30000,
    image: "/placeholder.svg?height=200&width=200",
    category: "cookie",
  },
  {
    id: 7,
    name: "Bánh kem matcha",
    description: "Bánh kem matcha thơm ngon với lớp kem matcha đậm đà.",
    price: 400000,
    image: "/placeholder.svg?height=200&width=200",
    category: "cake",
  },
  {
    id: 8,
    name: "Bánh croissant",
    description: "Bánh croissant giòn xốp với nhiều lớp bơ.",
    price: 40000,
    image: "/placeholder.svg?height=200&width=200",
    category: "pastry",
  },
];
