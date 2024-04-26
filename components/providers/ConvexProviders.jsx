"use client"
import React from 'react'
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

const ConvexClientProviders = ({children}) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk  client={convex} useAuth={useAuth}>
        {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProviders