"use server";

import Prompt from "@models/prompt.model";
import User from "@models/user.model";
import { connectToDB } from "@utils/database";
import { revalidatePath } from "next/cache";

export async function getAllPrompts(params) {
  try {
    await connectToDB();

    const { searchQuery } = params;

    const query = {};
    if (searchQuery) {
      query.$or = [
        { prompt: { $regex: new RegExp(searchQuery, "i") } },
        { tag: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const prompts = await Prompt.find(query).populate({
      path: "creator",
      model: User,
      select: "name email image clerkId",
    });

    return prompts;
  } catch (error) {
    console.log("Error occured while fetching the Prompts:", error);
    throw error;
  }
}

export async function getUserPrompts(params) {
  try {
    await connectToDB();

    const { userId } = params;

    const prompts = await Prompt.find({ creator: userId }).populate({
      path: "creator",
      model: User,
      select: "name email image clerkId",
    });

    return prompts;
  } catch (error) {
    console.log("Error occured while fetching the Prompts:", error);
    throw error;
  }
}

export async function getPromptById(params) {
  try {
    await connectToDB();

    const { promptId } = params;

    const promptDetail = await Prompt.findById(promptId).populate({
      path: "creator",
      model: User,
      select: "name email image clerkId",
    });

    return promptDetail;
  } catch (error) {
    console.log("Error occured while fetching the Prompts:", error);
    throw error;
  }
}

export async function editPrompt(params) {
  try {
    await connectToDB();

    const { promptId, prompt, tag } = params;

    await Prompt.findByIdAndUpdate(promptId, { prompt, tag });
  } catch (error) {
    console.log("Prompt did not update: ", error);
  }
}

export async function deletePrompt(params) {
  try {
    await connectToDB();

    const { promptId, path } = params;
    revalidatePath(path);

    await Prompt.findByIdAndDelete(promptId);
  } catch (error) {
    console.log("Prompt did not delete: ", error);
  }
}
