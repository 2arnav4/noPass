"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addCardServer } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number cannot exceed 19 digits" })
    .regex(/^(?:\d{4}[-\s]?){3}\d{4}$/, {
      message: "Invalid card number format",
    }),
  cardName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s-']*$/, {
      message: "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Expiry date must be in MM/YY format",
    })
    .refine(
      (val) => {
        const [month, year] = val.split("/");
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry > today;
      },
      { message: "Card has expired" }
    ),
  cvv: z
    .string()
    .min(3, { message: "CVV must be 3 or 4 digits" })
    .max(4, { message: "CVV must be 3 or 4 digits" })
    .regex(/^\d{3,4}$/, { message: "CVV must contain only numbers" }),
});

export function AddCard() {
  const user = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (user.user) {
      await addCardServer(
        values.cardNumber,
        values.expiryDate,
        parseInt(values.cvv),
        user?.user?.id
      );
      toast.success("Card added successfully");
      form.reset();
      router.refresh();
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll never store your card number on our servers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed on the front of your card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormDescription>The expiry date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Add Card
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
