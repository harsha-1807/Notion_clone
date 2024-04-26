"use client";
import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import Spinner from "@/components/Spinner";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScroll();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-6 pt-3 pb-3",
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            </SignInButton>
            <SignInButton mode="modal">

            <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
         
            <Button variant="ghost" size="sm" asChild >
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
            
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
