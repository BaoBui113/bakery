import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
export default function Newsletter() {
  return (
    <>
      {/* Newsletter */}
      <section className="bg-rose-50 py-12 flex flex-col items-center">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Đăng ký nhận thông tin
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Đăng ký để nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt.
            </p>
            <div className="flex w-full max-w-md flex-col gap-2 min-[400px]:flex-row">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="flex-1"
              />
              <Button className="bg-rose-500 hover:bg-rose-600">Đăng ký</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
