import PromptCard from "./PromptCard";
import { Button } from "./ui/button";
import Search from "./Search";

const Feed = ({ prompts }) => {
  return (
    <section className="mt-7 w-full">
      <Search route="/" />
      <div className="w-full p-4 mt-5 flex flex-wrap gap-4 justify-center items-start">
        {prompts.length > 0 ? (
          prompts.map((post) => (
            <PromptCard
              key={post?.id}
              name={post?.creator?.name}
              email={post?.creator?.email}
              img={post?.creator?.image}
              prompt={post?.prompt}
              tag={post?.tag}
              creatorId={post?.creator?.clerkId}
            />
          ))
        ) : (
          <div className="flex items-center flex-col justify-center gap-7 mt-7">
            <h1 className="text-lg font-bold blue_gradient text-center">
              There's no prompt to show yet. Be the first to break the ice
            </h1>
            <Button className="rounded-full px-5 bg-primary-orange">
              Create Prompt
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
