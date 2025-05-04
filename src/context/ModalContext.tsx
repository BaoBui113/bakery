"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  handleOpenLogin: () => void;
  handleCloseLogin: () => void;
  setOpenLogin: (open: boolean) => void;
  openLogin: boolean;
}

const ModalContext = createContext<ModalContextType>({
  handleOpenLogin: () => {},
  handleCloseLogin: () => {},
  setOpenLogin: () => {},
  openLogin: false,
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <ModalContext.Provider
      value={{ handleOpenLogin, handleCloseLogin, openLogin, setOpenLogin }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
