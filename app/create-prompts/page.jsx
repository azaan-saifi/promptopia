import CreateEditForm from "@components/CreateEditForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@lib/actions/user.action";

const CreatePrompts = async () => {
  const { userId } = auth();
  const user = await getUserById({ userId });

  if (!userId) {
    throw new Error("User not found");
  }

  return <CreateEditForm type="Create" id={JSON.stringify(user._id)} />;
};

export default CreatePrompts;
