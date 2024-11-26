import { Label } from "@radix-ui/react-label";
import H3 from "../common/H3";
import Post from "./Post";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { HouseIcon, ImageIcon } from "lucide-react";
import SelectBox from "../common/SelectBox";
import { Input } from "../ui/input";
import ImageSlider from "../common/ImageSlider";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useCreatePostMutation,
  useLazyGetPostsQuery,
  useUploadImageMutation,
} from "@/stores/api/postApi";
import { IPost, IPostCreate } from "@/utils/interfaces";
import { useAppSelector } from "@/stores/hooks";
import { toast } from "sonner";
import { postType } from "@/utils/predefinedData";
import SuggestPostContent from "../common/SuggestPostContent";
import PostSketeton from "./PostSkeleton";

const PostList = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [createPost] = useCreatePostMutation();
  const [uploadImages] = useUploadImageMutation();
  const user = useAppSelector((state) => state.auth.user);
  const [offset, setOffset] = useState(0);
  const [trigger, { data, isFetching }] = useLazyGetPostsQuery();
  const [postList, setPostList] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const postInit: IPostCreate = {
    content: "",
    type: "FIND_ROOM",
  };

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
      type && nextFilter.push(type);
    }
    setFilterPost(nextFilter);
    console.log(nextFilter);
  };

  useEffect(() => {
    trigger(offset);
  }, [offset, trigger]);

  useEffect(() => {
    if (data) {
      setPostList((prevPosts) => [...prevPosts, ...data.result]);
      setHasMore(data.result.length == 10);
    }
  }, [data]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50 &&
      !isFetching &&
      hasMore
    ) {
      setOffset((prevPage) => prevPage + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Xóa sự kiện khi component bị unmount
  }, [isFetching, hasMore]);

  const [postCreateData, setPostCreateData] = useState<IPostCreate>(postInit);
  const handleChangePost = (
    type: keyof IPostCreate,
    value: string | typeof postInit.type
  ) => {
    const nextData = {
      ...postCreateData,
      [type]: value,
    };
    setPostCreateData(nextData);
    console.log(nextData);
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setImages(event.target.files);
  };

  const handleSubmitPost = () => {
    if (!user) {
      toast.warning("Vui lòng đang nhập trước khi đăng");
      return;
    }
    createPost(postCreateData).then((data) => {
      const postId = data.data?.result.id;
      if (images && images.length > 0 && postId)
        uploadImages({ postId, images });
    });

    setPostCreateData(postInit);
    setImages(null);
  };

  return (
    <div className="container flex mt-3 items-start justify-center gap-3">
      <div
        className={`rounded-xl border bg-background lg:w-1/4 lg-w-1/4 sticky top-[140px]  py-4 px-6 hidden md:block`}
      >
        <H3 className="mb-6">Bài đăng tìm trọ</H3>
        <div>
          <Label>Loại bài đăng</Label>
          <div className="ml-3 mt-2 flex flex-col gap-2">
            {Object.keys(postType).map((type) => (
              <div key={type}>
                <Checkbox
                  checked={filterPost.includes(type as keyof typeof postType)}
                  onCheckedChange={() =>
                    handleCheckType(type as keyof typeof postType)
                  }
                  id={type}
                  className="mr-2"
                />
                <Label htmlFor={type}>
                  {postType[type as keyof typeof postType]}
                </Label>
              </div>
            ))}
          </div>
          <Button size={"sm"} className="w-full mt-4" variant={"secondary"}>
            Lọc
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          <div
            className={`rounded-xl border bg-background py-4 px-6 lg:hidden`}
          >
            <H3>Tạo bài viết</H3>
            <div className="mt-4">
              <div className="flex  gap-2 ">
                <Label className="text-sm text-slate-600 flex-1 items-baseline">
                  Bạn muốn đăng bài
                </Label>
                <div className="flex-1">
                  <SelectBox
                    options={Object.keys(postType).map((type) => ({
                      value: type,
                      label: postType[type as keyof typeof postType],
                    }))}
                    onSelectChange={(value) => handleChangePost("type", value)}
                  ></SelectBox>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Nội dung bài viết..."
                  rows={2}
                  value={postCreateData.content}
                  onChange={(e) => handleChangePost("content", e.target.value)}
                ></Textarea>
                <SuggestPostContent
                  postType={postCreateData.type}
                  onSubmit={(content) => handleChangePost("content", content)}
                />
              </div>
              <Input
                id="post-image-input"
                type="file"
                className="size-0 invisible"
                onChange={handleChangeImage}
                multiple
              ></Input>
              <div>
                {images && (
                  <ImageSlider
                    height={200}
                    images={Array.from(images).map((image: File) => ({
                      id: image.name,
                      url: URL.createObjectURL(image),
                    }))}
                  ></ImageSlider>
                )}
              </div>
              <div className="flex justify-end text-main-blue-s3 mt-3 items-center">
                <Button size={"icon"} variant={"ghost"}>
                  <Label htmlFor="post-image-input">
                    <ImageIcon></ImageIcon>
                  </Label>
                </Button>
                <Button size={"icon"} variant={"ghost"}>
                  <HouseIcon></HouseIcon>
                </Button>

                <Button
                  size={"sm"}
                  className="block ml-auto"
                  onClick={handleSubmitPost}
                  disabled={Object.values(postCreateData).some(
                    (value) => !value.trim()
                  )}
                >
                  Đăng bài
                </Button>
              </div>
            </div>
          </div>
          
          {postList
            ?.filter((p) => filterPost.includes(p.type))
            .map((post) => (
              <Post key={post.id} data={post} />
            ))}
            {isFetching &&
            Array.from(new Array(10)).map((_, i) => <PostSketeton key={i} />)}
        </div>
      </div>
      <div
        className={`rounded-xl border bg-background lg:w-1/4 sticky top-[140px] py-4 px-6 hidden lg:block`}
      >
        <H3>Tạo bài viết</H3>
        <div className="mt-4">
          <div className="flex items-start">
            <Label className="text-sm text-slate-600">Bạn muốn đăng bài</Label>
            <SelectBox
              options={[
                { value: "FIND_ROOM", label: "Tìm trọ" },
                { value: "PASS_ROOM", label: "Pass trọ" },
                { value: "REVIEW", label: "Review" },
                { value: "FIND_ROOMMATE", label: "Tìm người ở ghép" },
              ]}
              onSelectChange={(value) => handleChangePost("type", value)}
            ></SelectBox>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Nội dung bài viết..."
              rows={7}
              value={postCreateData.content}
              onChange={(e) => handleChangePost("content", e.target.value)}
            ></Textarea>
            <SuggestPostContent
              postType={postCreateData.type}
              onSubmit={(content) => handleChangePost("content", content)}
            />
          </div>
          <Input
            id="post-image-input"
            type="file"
            className="size-0 invisible"
            onChange={handleChangeImage}
            multiple
          ></Input>
          <div>
            {images && (
              <ImageSlider
                height={200}
                images={Array.from(images).map((image: File) => ({
                  id: image.name,
                  url: URL.createObjectURL(image),
                }))}
              ></ImageSlider>
            )}
          </div>
          <div className="flex justify-end text-main-blue-s3 mt-3 items-center">
            <Button size={"icon"} variant={"ghost"}>
              <Label htmlFor="post-image-input">
                <ImageIcon></ImageIcon>
              </Label>
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <HouseIcon></HouseIcon>
            </Button>

            <Button
              size={"sm"}
              className="block ml-auto"
              onClick={handleSubmitPost}
              disabled={Object.values(postCreateData).some(
                (value) => !value.trim()
              )}
            >
              Đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
