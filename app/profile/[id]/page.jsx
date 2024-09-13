import Profile from "@components/Profile";
import { getUserPrompts } from "@lib/actions/prompt.action";
import { getUserById } from "@lib/actions/user.action";
import React from "react";

const MyProfile = async ({ params }) => {
  const userId = params.id;
  const user = await getUserById({ userId });
  const prompts = await getUserPrompts({ userId: user._id });

  return <Profile user={user} prompts={prompts} />;
};

export default MyProfile;
