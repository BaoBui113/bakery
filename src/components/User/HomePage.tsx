"use client";

import Banner from "./Banner";
import Category from "./Category";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Banner />
        <Category />
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
