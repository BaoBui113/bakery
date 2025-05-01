import { Cake, Heart, Star } from "lucide-react";

export default function Features() {
  return (
    <>
      {/* Features Section */}
      <section className="bg-muted py-12">
        <div className="container space-y-12 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng nhất.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <Cake className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold">Nguyên liệu tươi ngon</h3>
              <p className="text-muted-foreground">
                Chúng tôi chỉ sử dụng những nguyên liệu tươi ngon nhất để đảm
                bảo chất lượng sản phẩm.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <Star className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold">Làm thủ công</h3>
              <p className="text-muted-foreground">
                Mỗi sản phẩm đều được làm thủ công với sự tỉ mỉ và tình yêu
                thương.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold">Giao hàng tận nơi</h3>
              <p className="text-muted-foreground">
                Chúng tôi cung cấp dịch vụ giao hàng tận nơi để đảm bảo bạn nhận
                được sản phẩm tươi ngon nhất.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
