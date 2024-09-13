"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@lib/utils";

const Search = ({ route }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (pathname === route) {
        const newUrl = removeUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [search, query, router, route, searchParams]);

  return (
    <div className="w-full">
      <Input
        placeholder="Search for a tag or a username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search_input max-w-[620px] max-md:max-w-[400px] mx-auto"
      />
    </div>
  );
};

export default Search;
