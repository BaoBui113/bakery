"use client";

import Banner from "./Banner";
import Category from "./Category";
import Features from "./Features";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Banner />
      <Category />
      <Features />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
