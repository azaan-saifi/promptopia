"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { editPrompt } from "@lib/actions/prompt.action";

const CreateEditForm = ({ type, id, promptDetails }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parsedPrompt = promptDetails && JSON.parse(promptDetails);

  const form = useForm({
    defaultValues: {
      prompt: parsedPrompt?.prompt || "",
      tag: parsedPrompt?.tag || "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      if (type === "Edit") {
        await editPrompt({
          promptId: parsedPrompt._id,
          prompt: values.prompt,
          tag: values.tag,
        });
        router.push("/");
      } else {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: values.prompt,
            id: JSON.parse(id),
            tag: values.tag,
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log("Prompt didn't create", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section className="w-full flex flex-col gap-7 max-w-full mt-10">
      <div className="flex flex-col gap-5 text-left">
        <h1 className="font-extrabold text-3xl blue_gradient">{type} Post</h1>
        <p>
          {type} and share amazing prompts with the world and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>
      <div className="p-3 glassmorphism">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your AI Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Write your prompt here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag (#product, #web-dev, #idea)</FormLabel>
                  <FormControl>
                    <Input required placeholder="#tag" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 flex-end">
              <Link href={"/"}>
                <Button className="rounded-full border bg-white text-gray-900 hover:bg-primary-orange hover:text-white transition duration-200 ease-linear">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border hover:bg-white hover:text-gray-900 bg-primary-orange text-white transition duration-200 ease-linear"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    {type === "Edit" ? "Editing..." : "Creating..."}
                  </>
                ) : type === "Edit" ? (
                  "Edit"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateEditForm;
