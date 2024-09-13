"use server";

import User from "@models/user.model";
import { connectToDB } from "@utils/database";

export async function createUser(userData) {
  try {
    await connectToDB();
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params) {
  try {
    connectToDB();

    const { id, updateData } = params;

    const updatedUser = await User.findOneAndUpdate({
      clerkId: id,
      updateData,
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params) {
  try {
    connectToDB();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw Error("User not found");
    }

    // TODO: delete the prompts created by this user
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params) {
  try {
    await connectToDB();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("Error while fetching the user from the database", error);
    throw error;
  }
}
