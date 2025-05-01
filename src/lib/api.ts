"use server";
export const getProducts = async (page: number, category: string) => {
  const res = await fetch(
    `http://127.0.0.1:8080/api/v1/products?page=${page}&category=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
