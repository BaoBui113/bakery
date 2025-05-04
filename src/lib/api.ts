"use server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getProducts = async (page: number, category: string) => {
  const res = await fetch(
    `${API_URL}products?page=${page}&category=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
export const getCategories = async () => {
  const res = await fetch(`${API_URL}categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // …existing code…

  // - console.log("In ra res", res.json());
  const data = await res.json();
  console.log("In ra res", data);

  if (!res.ok) {
    const errorData = data; // đã đọc trước đó
    throw new Error(errorData.error || "Đăng nhập thất bại");
  }

  // - return res.json();
  return data;
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_URL}auth`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
}

export const purchaseProduct = async (
  productId: string,
  quantity: number,
  token: string
) => {
  console.log("productId", productId);

  const res = await fetch(`${API_URL}products/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};

export const addToCart = async (
  productId: string,
  quantity: number,
  token: string
) => {
  console.log("productId", productId);

  const res = await fetch(`${API_URL}cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};

export const getCart = async (token: string) => {
  const res = await fetch(`${API_URL}cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};

export const removeFromCart = async (productId: string, token: string) => {
  const res = await fetch(`${API_URL}cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};

export const updateCart = async (
  quantity: number,
  productId: string,
  token: string
) => {
  const res = await fetch(`${API_URL}cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};

export const checkout = async (token: string) => {
  const res = await fetch(`${API_URL}orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("In ra res", data);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return data;
};
