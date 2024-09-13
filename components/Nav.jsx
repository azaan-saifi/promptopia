"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const { userId } = useAuth();

  return (
    <nav className="flex w-full justify-between items-center p-3">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="promptopia"
          width={30}
          height={30}
        />
        <p className="text-xl font-bold max-sm:hidden">Promptopia</p>
      </Link>

      <div className="flex gap-3 items-center">
        <SignedIn>
          <Link href={"/create-prompts"}>
            <Button className="max-sm:hidden border transition duration-200 ease-linear rounded-full px-5 hover:bg-white hover:text-gray-900">
              Create Prompts
            </Button>
          </Link>
          <Link href={`/profile/${userId}`}>
            <Button className="max-sm:hidden border transition duration-200 ease-linear rounded-full px-5 bg-white text-gray-900 hover:bg-gray-900 hover:text-white">
              My Profile
            </Button>
          </Link>
          <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                avatarBox: "size-9",
              },
            }}
          />
        </SignedIn>

        <div className="max-sm:hidden flex gap-3">
          <SignedOut>
            <SignInButton mode="modal" appearance={{ baseTheme: dark }}>
              <Button className="rounded-full px-6">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Nav */}
        <div className="pt-2 sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Menu className="size-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cursor-pointer mr-10 mt-2 py-2 px-2 text-xl">
              <SignedIn>
                <Link href={`/profile/${userId}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    My Profile
                  </DropdownMenuItem>
                </Link>
                <Link href={"/create-prompts"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Create Prompts
                  </DropdownMenuItem>
                </Link>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col mt-1 gap-2">
                  <SignInButton mode="modal" appearance={{ baseTheme: dark }}>
                    <DropdownMenuItem className=" cursor-pointer text-center border border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900">
                      Sign In
                    </DropdownMenuItem>
                  </SignInButton>
                </div>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
