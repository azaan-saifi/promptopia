import CreateEditForm from "@components/CreateEditForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@lib/actions/user.action";
import { getPromptById } from "@lib/actions/prompt.action";

const EditPrompts = async ({ params }) => {
  const { userId } = auth();
  const user = await getUserById({ userId });
  const prompt = await getPromptById({ promptId: params.id });

  if (!userId) {
    throw new Error("User not found");
  }

  return (
    <CreateEditForm
      type="Edit"
      id={JSON.stringify(user._id)}
      promptDetails={JSON.stringify(prompt)}
    />
  );
};

export default EditPrompts;
