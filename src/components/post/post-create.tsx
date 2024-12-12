import { IPostCreate } from "@/lib/types";
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from "@/stores/api/postApi";
import { useAppSelector } from "@/stores/hooks";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import H3 from "../common/H3";
import { Label } from "../ui/label";
import SelectBox from "../common/SelectBox";
import { Textarea } from "../ui/textarea";
import SuggestPostContent from "./suggest-post-content";
import { Input } from "../ui/input";
import ImageSlider from "../common/ImageSlider";
import { Button } from "../ui/button";
import { HouseIcon, ImageIcon } from "lucide-react";

const PostCreate = () => {
  const [images, setImages] = useState<FileList | null>(null);
  // const [createPost] = useCreatePostMutation();
  // const [uploadImages] = useUploadImageMutation();
  // const user = useAppSelector((state) => state.auth.user);
  // const postInit: IPostCreate = {
  //   content: "",
  //   type: "FIND_ROOM",
  // };
  const handleChangePost = (
    type: keyof IPostCreate,
    value: string | typeof postInit.type
  ) => {
    // const nextData = {
    //   ...postCreateData,
    //   [type]: value,
    // };
    // setPostCreateData(nextData);
    // console.log(nextData);
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setImages(event.target.files);
  };

  const handleSubmitPost = () => {
    // if (!user) {
    //   toast.warning("Vui lòng đang nhập trước khi đăng");
    //   return;
    // }
    // createPost(postCreateData).then((data) => {
    //   const postId = data.data?.result.id;
    //   if (images && images.length > 0 && postId)
    //     uploadImages({ postId, images });
    // });

    // setPostCreateData(postInit);
    setImages(null);
  };

  const [postCreateData, setPostCreateData] = useState<IPostCreate>();
  return (
    <div className={`rounded-xl border bg-background py-4 px-6 `}>
      <H3>Tạo bài viết</H3>
      <div className="mt-4">
        <div>
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
            rows={10}
            // value={postCreateData.content}
            onChange={(e) => handleChangePost("content", e.target.value)}
          ></Textarea>
          <SuggestPostContent
            postType={""}
            // postType={postCreateData.type}
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
            // disabled={Object.values(postCreateData).some(
            //   (value) => !value.trim()
            // )}
          >
            Đăng bài
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
