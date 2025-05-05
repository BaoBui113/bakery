"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditQuantityCart } from "@/hook/useCart";
import { IOrderForm } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(100, "Quantity cannot exceed 100"),
});

export default function ModalOrder({
  orderDetail,
  open,
  setOpen,
}: {
  orderDetail: IOrderForm;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: orderDetail.quantity,
    },
  });

  const { mutate: handleEditQuantity } = useEditQuantityCart();
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { quantity } = values;
    handleEditQuantity(
      {
        orderId: orderDetail.orderId,
        userId: orderDetail.userId,
        newQuantity: Number(quantity),
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  }

  const incrementQuantity = () => {
    if (form.getValues("quantity") < 100) {
      const newQuantity = form.getValues("quantity") + 1;
      form.setValue("quantity", newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (form.getValues("quantity") > 1) {
      const newQuantity = form.getValues("quantity") - 1;
      form.setValue("quantity", newQuantity);
    }
  };

  useEffect(() => {
    if (open) {
      form.setValue("quantity", orderDetail.quantity);
    }
    return () => {
      form.reset();
    };
  }, [open, orderDetail, form]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle className="text-xl font-semibold">Edit order</DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Quantity</FormLabel>
                <FormDescription>
                  Update the quantity of items in your order
                </FormDescription>
                <div className="flex items-center mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={form.getValues("quantity") <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-10 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min={1}
                      max={100}
                      {...field}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange("");
                        } else {
                          const numberValue = Number.parseInt(value);
                          if (!isNaN(numberValue)) {
                            field.onChange(numberValue);
                          }
                        }
                      }}
                      name={field.name}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={form.getValues("quantity") >= 100}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
