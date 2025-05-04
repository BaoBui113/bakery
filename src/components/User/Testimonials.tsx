import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-12" id="about">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Hãy xem những gì khách hàng của chúng tôi nói về sản phẩm của
              chúng tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center space-x-2">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="font-bold">Nguyễn Văn A</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                {`"Bánh ngọt ở đây thật tuyệt vời! Tôi đặc biệt yêu thích bánh kem
                chocolate của họ."`}
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center space-x-2">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="font-bold">Trần Thị B</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                {`"Dịch vụ giao hàng nhanh chóng và bánh luôn tươi mới. Tôi sẽ
                tiếp tục ủng hộ!"`}
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center space-x-2">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="font-bold">Lê Văn C</h3>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                {`"Bánh quy ở đây thật ngon! Tôi đã đặt cho cả văn phòng và mọi
                người đều thích."`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
