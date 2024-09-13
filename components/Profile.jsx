import React from "react";
import PromptCard from "./PromptCard";
import { Button } from "./ui/button";
import Link from "next/link";

const Profile = ({ user, prompts }) => {
  return (
    <section className="mt-7 w-full h-full flex flex-col gap-7">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-3xl font-satoshi font-bold blue_gradient">
          {user.name}
        </h1>
        <p>
          Welcome {user.name}! Unleash your imagination, craft powerful prompts,
          and share them with a community that thrives on inspiration. Let's
          spark ideas, explore new horizons, and fuel each other's creativity!
        </p>
      </div>
      <div className="w-full p-4 mt-5 flex flex-wrap gap-4 justify-center items-start">
        {prompts.length > 0 ? (
          prompts.map((post) => (
            <PromptCard
              key={post?._id}
              name={post?.creator?.name}
              email={post?.creator?.email}
              img={post?.creator?.image}
              prompt={post?.prompt}
              tag={post?.tag}
              creatorId={post?.creator?.clerkId}
              promptId={JSON.stringify(post?._id)}
            />
          ))
        ) : (
          <div className="flex items-center flex-col justify-center gap-7 mt-7">
            <h1 className="text-lg font-bold blue_gradient text-center">
              There's no prompt to show yet. Be the first to break the ice
            </h1>
            <Link href={"/create-prompts"}>
              <Button className="rounded-full px-5 bg-primary-orange">
                Create Prompt
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
