import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
export default function Banner() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 py-12 md:py-24">
          <div className="container mx-auto grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bánh ngọt tươi mới mỗi ngày
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Khám phá các loại bánh ngọt thơm ngon, được làm thủ công từ
                  những nguyên liệu tươi ngon nhất.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-rose-500 hover:bg-rose-600">
                  Đặt hàng ngay
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Xem thực đơn</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bánh ngọt đặc biệt"
                className="aspect-square rounded-full object-cover border-8 border-white shadow-xl"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
