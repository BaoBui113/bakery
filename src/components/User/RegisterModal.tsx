"use client";

import { useModal } from "@/context/ModalContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RegistrationForm } from "./FormRegister";

export default function RegisterModal() {
  const {
    openRegister: open,
    setOpenRegister: setOpen,
    handleCloseRegister,
  } = useModal();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Đăng ký
          </DialogTitle>

          <DialogDescription className="text-center">
            Đăng ký để truy cập tài khoản và tiếp tục mua sắm
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm />
      </DialogContent>
    </Dialog>
  );
}
