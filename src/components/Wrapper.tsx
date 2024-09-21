'use client'
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";


const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <ConvexProvider client={convex}>
          {children}
        </ConvexProvider>
      </ClerkProvider>
    </div>
  );
};

export default Wrapper;