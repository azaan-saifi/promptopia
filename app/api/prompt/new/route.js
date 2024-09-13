import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: id,
      prompt,
      tag,
    });

    return NextResponse.json(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("Prompt not created: ", error);
    return NextResponse.json("Failed to create a new prompt", { status: 500 });
  }
}
