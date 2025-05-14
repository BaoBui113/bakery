"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { useDebounce } from "@/hook/useDebounce";
import {
  checkEmail,
  checkPhone,
  registerUser,
  sendOtp,
  verifyOtp,
} from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { z } from "zod";
// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),

  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),

  gender: z.enum(["male", "female"]),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [isCheckExist, setIsCheckExist] = useState({
    email: true,
    phoneNumber: true,
    isLoadingEmail: false,
    isLoadingPhone: false,
  });
  const { handleCloseRegister } = useModal();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [otp, setOtp] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      gender: "male",
    },
  });
  const name = form.watch("email");
  const debouncedEmail = useDebounce(name, 200);

  const phone = form.watch("phoneNumber");
  const debouncedPhone = useDebounce(phone, 200);
  const onSubmitDetails = async (data: FormValues) => {
    setFormData(data);
    setLoadingVerify(true);
    try {
      await sendOtp(data.email);
      toast.success(`OTP sent to ${data.email}. Please check your email.`);
      setStep("otp");
    } catch (error) {
      toast.error("Error sending OTP");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleOtpVerified = async (email: string, otp: string) => {
    if (!email || !otp) {
      toast.error("Please enter your email and OTP");
      return;
    }

    try {
      const res = await verifyOtp(email, otp);
      return res;
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(formData);
      console.log("In ra res", res);

      if (res.status === 200) {
        const t = res.metadata.accessToken;
        Cookies.set("userToken", t, { path: "/", expires: 1 / 24 });

        setUser(res.metadata.user);
        toast.success("Registration successful! Please check your email.");
        handleCloseRegister();
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      toast.error("Error registering user");
    }
  };

  const handleRegistration = async () => {
    if (!formData) return;
    setLoading(true);
    try {
      const checkOtp = await handleOtpVerified(formData.email, otp);
      if (!checkOtp.metadata) {
        toast.error("Invalid OTP. Please try again.");
        return;
      }
      await handleRegister();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!debouncedEmail) return;
    setIsCheckExist((prev) => ({ ...prev, isLoadingEmail: true }));
    checkEmail(debouncedEmail)
      .then((isExist) => {
        if (isExist) {
          form.setError("email", {
            type: "manual",
            message: "Email already exists",
          });
          setIsCheckExist((prev) => ({ ...prev, email: true }));
        } else {
          form.clearErrors("email");
          setIsCheckExist((prev) => ({ ...prev, email: false }));
        }
      })
      .catch((error) => {
        toast.error("Error checking email");
        setIsCheckExist((prev) => ({ ...prev, email: true }));
        console.log("Error checking email:", error);
        // Xử lý lỗi nếu cần
      })
      .finally(() => {
        setIsCheckExist((prev) => ({ ...prev, isLoadingEmail: false }));
      });
  }, [debouncedEmail]);

  useEffect(() => {
    if (!debouncedPhone) return;
    setIsCheckExist((prev) => ({ ...prev, isLoadingPhone: true }));
    checkPhone(debouncedPhone)
      .then((isExist) => {
        if (isExist) {
          form.setError("phoneNumber", {
            type: "manual",
            message: "Phone number already exists",
          });
          setIsCheckExist((prev) => ({ ...prev, phoneNumber: true }));
        } else {
          form.clearErrors("phoneNumber");
          setIsCheckExist((prev) => ({ ...prev, phoneNumber: false }));
        }
      })
      .catch((error) => {
        toast.error("Error checking phone number");
        setIsCheckExist((prev) => ({ ...prev, phoneNumber: true }));
        console.log("Error checking phone number", error);
      })
      .finally(() => {
        setIsCheckExist((prev) => ({ ...prev, isLoadingPhone: false }));
      });
  }, [debouncedPhone]);
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {step === "details" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitDetails)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={
                loadingVerify ||
                isCheckExist.email ||
                isCheckExist.phoneNumber ||
                isCheckExist.isLoadingEmail ||
                isCheckExist.isLoadingPhone
              }
              type="submit"
              className="w-full"
            >
              {loadingVerify ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              Verify Your Phone Number
            </h2>
            <p className="text-muted-foreground">
              We've sent a verification code to {formData?.phoneNumber}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2"></span>}
                renderInput={(props) => (
                  <Input
                    {...props}
                    className="w-12 h-12 text-center text-xl"
                    inputMode="numeric"
                  />
                )}
                containerStyle="flex justify-center gap-2"
                inputStyle={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.25rem",
                  textAlign: "center",
                }}
              />
            </div>

            <div className="text-sm text-center text-muted-foreground">
              <p>Enter the 6-digit code sent to your phone</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              disabled={loading}
              onClick={handleRegistration}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                " Verify OTP"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep("details")}
              className="w-full"
            >
              Back to Details
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                // In a real app, you would resend the OTP here
                alert("OTP resent to your phone number");
              }}
              className="w-full"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
