"use client";
import { getCurrentUser, loginUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface IUser {
  id: string;
  name: string;
  email: string;
  // …other fields…
}

interface AuthContextType {
  user: IUser | null;

  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,

  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  // load token & user on mount
  useEffect(() => {
    const t = Cookies.get("userToken");
    if (t) {
      // fetch current user profile
      getCurrentUser(t)
        .then((data) => {
          console.log("User data", data);

          setUser(data.metadata.user);
        })
        .catch(() => {
          Cookies.remove("userToken");
        });
    }
  }, []);

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser({ email, password }),
    onSuccess: (data) => {
      const t = data.metadata.accessToken;
      Cookies.set("userToken", t, { path: "/", expires: 1 / 24 });
      toast.success("Đăng nhập thành công!");
      setUser(data.metadata.user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const login = (email: string, password: string) => {
    mutation.mutate({ email, password });
  };

  const logout = () => {
    Cookies.remove("userToken");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
