import HomePage from "@/components/User/HomePage";
import { getCategories, getProducts } from "@/lib/api";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
async function getData() {
  const queryClient = new QueryClient();
  const search = { page: 1, category: "all" };

  // Prefetch queries cho sản phẩm và danh mục
  await queryClient.prefetchQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search.page, search.category),
  });
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return dehydrate(queryClient); // Dehydrate để gửi trạng thái đã prefetch
}
export default async function Home() {
  const dehydratedState = await getData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
}
