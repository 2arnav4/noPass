"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expiry: string;
  cvv: number;
}

interface Password {
  website: string;
  username: string;
  password: string;
}

export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  // Get existing cards or initialize empty array
  const existingCards = Array.isArray(user.privateMetadata.cards) 
    ? user.privateMetadata.cards 
    : [];
  
  // Add new card
  const updatedCards = [...existingCards, { cardNo, expiry, cvv }];
  
  // Update metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata, // Preserve other metadata
      cards: updatedCards,
    },
  });
}

export async function addPasswordServer(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  // Get existing passwords or initialize empty array
  const existingPasswords = Array.isArray(user.privateMetadata.passwords)
    ? user.privateMetadata.passwords
    : [];
    
  // Add new password
  const updatedPasswords = [...existingPasswords, { website, username, password }];
  
  // Update metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata, // Preserve other metadata
      passwords: updatedPasswords,
    },
  });
}

// Add this function to fetch user data
export async function getUserData(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  return {
    cards: Array.isArray(user.privateMetadata.cards) ? user.privateMetadata.cards : [],
    passwords: Array.isArray(user.privateMetadata.passwords) ? user.privateMetadata.passwords : []
  };
}