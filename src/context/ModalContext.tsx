"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  handleOpenLogin: () => void;
  handleCloseLogin: () => void;
  setOpenLogin: (open: boolean) => void;
  openLogin: boolean;
  handleOpenRegister: () => void;
  handleCloseRegister: () => void;
  setOpenRegister: (open: boolean) => void;
  openRegister: boolean;
}

const ModalContext = createContext<ModalContextType>({
  handleOpenLogin: () => {},
  handleCloseLogin: () => {},
  setOpenLogin: () => {},
  openLogin: false,
  handleOpenRegister: () => {},
  handleCloseRegister: () => {},
  setOpenRegister: () => {},
  openRegister: false,
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleOpenLogin = () => {
    setOpenRegister(false);
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <ModalContext.Provider
      value={{
        handleOpenLogin,
        handleCloseLogin,
        openLogin,
        setOpenLogin,
        handleOpenRegister,
        handleCloseRegister,
        openRegister,
        setOpenRegister,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
