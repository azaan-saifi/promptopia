import Feed from "@components/Feed";
import { getAllPrompts } from "@lib/actions/prompt.action";

const Home = async ({ searchParams }) => {
  const prompts = await getAllPrompts({ searchQuery: searchParams?.q });
  return (
    <section className="w-full flex-center flex-col mt-7">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI Prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      <Feed prompts={prompts} />
    </section>
  );
};

export default Home;
