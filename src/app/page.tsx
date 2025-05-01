import HomePage from "@/components/User/HomePage";
import { getProducts } from "@/lib/api";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const search = {
    page: 1,
    category: "all",
  };
  await queryClient.prefetchQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search.page, search.category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
