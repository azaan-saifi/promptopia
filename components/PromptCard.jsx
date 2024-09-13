// "use client";
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePrompt } from "@lib/actions/prompt.action";

const PromptCard = ({
  name,
  email,
  img,
  prompt,
  tag,
  creatorId,
  promptId,
  setSearch,
}) => {
  const [copied, setCopied] = useState("");
  const { userId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const showActionButtons =
    userId && userId === creatorId && pathname === `/profile/${creatorId}`;

  const handleCopy = () => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopied("");
    }, 1000);
  };

  const handleEdit = () => {
    router.push(`/edit-prompt/${JSON.parse(promptId)}`);
  };
  const handleDelete = async () => {
    await deletePrompt({ promptId: JSON.parse(promptId), path: pathname });
  };

  return (
    <>
      <div className="w-full max-w-96 flex flex-col gap-6 glassmorphism">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${creatorId}`}
            className="flex items-center gap-2"
          >
            <div>
              <Image
                src={img}
                width={40}
                height={40}
                alt={name}
                className="rounded-full object-contain"
              />
            </div>
            <div className="">
              <p className="font-satoshi font-semibold">{name}</p>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
          </Link>
          <button className="cursor-pointer copy_btn" onClick={handleCopy}>
            <Image
              src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
              width={20}
              height={20}
              alt="copy"
            />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-satoshi font-medium">{prompt}</p>
          <p className="font-satoshi cursor-pointer text-blue-400">{tag}</p>
        </div>
        {showActionButtons && (
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={handleEdit}
              className="bg-green-200 text-green-700 transition duration-200 ease-linear hover:bg-green-700 hover:text-white"
            >
              EDIT
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-200 text-red-700 transition duration-200 ease-linear hover:bg-red-700 hover:text-white">
                  DELETE
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="transition duration-200 ease-linear bg-red-700 text-white hover:bg-red-600"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </>
  );
};

export default PromptCard;
