import React, { useState } from "react";
import PostSketeton from "./post-skeleton";
import { IPost } from "@/lib/types";

const PostList = () => {
  // const [offset, setOffset] = useState(0);
  // const [trigger, { data, isFetching }] = useLazyGetPostsQuery();
  const [postList, setPostList] = useState<IPost[]>([]);
  // const [hasMore, setHasMore] = useState(false);

  // const [filterPost, setFilterPost] = useState<(keyof typeof postType)[]>([
  //   "FIND_ROOM",
  //   "FIND_ROOMMATE",
  //   "PASS_ROOM",
  //   "REVIEW",
  // ]);

  // useEffect(() => {
  //   trigger(offset);
  // }, [offset, trigger]);

  // useEffect(() => {
  //   if (data) {
  //     setPostList((prevPosts) => [...prevPosts, ...data.result]);
  //     setHasMore(data.result.length == 10);
  //   }
  // }, [data]);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 50 &&
  //     !isFetching &&
  //     hasMore
  //   ) {
  //     setOffset((prevPage) => prevPage + 10);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll); // Xóa sự kiện khi component bị unmount
  // }, [isFetching, hasMore]);

  if (true)
    return (
      <div className="flex gap-4 flex-col">
        <PostSketeton />
        <PostSketeton />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:hidden">{/* <PostCreate /> */}</div>

      {postList
        ?.filter((p) => filterPost.includes(p.type))
        .map((post) => (
          <Post key={post.id} data={post} />
        ))}
    </div>
  );
};

export default PostList;
