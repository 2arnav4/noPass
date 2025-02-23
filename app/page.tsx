import { AddCard } from "@/components/add-card";
import { AddPassword } from "@/components/add-password";
import { YourCards } from "@/components/your-cards";
import { YourPasswords } from "@/components/your-passwords";
import type { Metadata } from "next";
import React from "react";

import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "NoPass - Home",
  description: "The home page of NoPass",
};

export default async function Home() {
  const user = await currentUser();
  console.log(user?.privateMetadata.cards);
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Password Manager</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Add a Credit Card</h1>
          <AddCard />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Add a Password</h1>
          <AddPassword />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Cards</h1>
          <YourCards
            cards={
              Array.isArray(user?.privateMetadata.cards)
                ? user?.privateMetadata.cards
                : []
            }
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Passwords</h1>
          <YourPasswords
            passwords={
              Array.isArray(user?.privateMetadata.passwords)
                ? user?.privateMetadata.passwords
                : []
            }
          />
        </div>
      </div>
    </div>
  );
}
