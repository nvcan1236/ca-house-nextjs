import React, { useState } from "react";
import H3 from "../common/H3";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { postType } from "@/lib/predefined-data";

const PostFilter = () => {
  const [filterPost, setFilterPost] = useState<(keyof typeof postType)[]>([
    "FIND_ROOM",
    "FIND_ROOMMATE",
    "PASS_ROOM",
    "REVIEW",
  ]);
  const handleCheckType = (type: keyof typeof postType) => {
    let nextFilter = [...filterPost];
    if (filterPost.includes(type)) {
      nextFilter = filterPost.filter((t) => t != type);
    } else {
      if (type) nextFilter.push(type);
    }
    setFilterPost(nextFilter);
  };
  return (
    <div
      className={`rounded-xl border bg-background py-4 px-6 `}
    >
      <H3 className="mb-4">Lọc bài viết</H3>
      <div>
        <Label>Loại bài đăng</Label>
        <div className="ml-3 mt-4 flex flex-col gap-3">
          {Object.keys(postType).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                checked={filterPost.includes(type as keyof typeof postType)}
                onCheckedChange={() =>
                  handleCheckType(type as keyof typeof postType)
                }
                id={type}
              />
              <Label htmlFor={type}>
                {postType[type as keyof typeof postType]}
              </Label>
            </div>
          ))}
        </div>
        <Button size={"sm"} className="w-full mt-6" variant={"secondary"}>
          Lọc
        </Button>
      </div>
    </div>
  );
};

export default PostFilter;
