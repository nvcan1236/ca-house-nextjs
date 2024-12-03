"use client";
import PostFilter from "@/components/post/post-filter";
import PostCreate from "@/components/post/post-create";
import PostList from "@/components/post/post-list";

const PostListPage = () => {
  // if fetching

  return (
    <div className="container flex mt-3 items-start justify-center gap-3">
      <div className="lg:w-1/4 lg-w-1/4 sticky top-[140px]   hidden md:block">
        {/* <PostFilter /> */}
      </div>

      <div className="flex-1">
        <PostList />
      </div>

      <div className="lg:w-1/4 sticky top-[140px]  hidden lg:block">
        {/* <PostCreate /> */}
      </div>
    </div>
  );
};

export default PostListPage;

//!: CODE CŨ POST CREATE HIỂN THỊ TRÊN MÀN HÌNH NHỎ
// <div
//   className={`rounded-xl border bg-background lg:w-1/4 sticky top-[140px] py-4 px-6 hidden lg:block`}
// >
//   <H3>Tạo bài viết</H3>
//   <div className="mt-4">
//     <div className="flex items-start">
//       <Label className="text-sm text-slate-600">Bạn muốn đăng bài</Label>
//       <SelectBox
//         options={[
//           { value: "FIND_ROOM", label: "Tìm trọ" },
//           { value: "PASS_ROOM", label: "Pass trọ" },
//           { value: "REVIEW", label: "Review" },
//           { value: "FIND_ROOMMATE", label: "Tìm người ở ghép" },
//         ]}
//         onSelectChange={(value) => handleChangePost("type", value)}
//       ></SelectBox>
//     </div>
//     <div className="relative">
//       <Textarea
//         placeholder="Nội dung bài viết..."
//         rows={7}
//         value={postCreateData.content}
//         onChange={(e) => handleChangePost("content", e.target.value)}
//       ></Textarea>
//       <SuggestPostContent
//         postType={postCreateData.type}
//         onSubmit={(content) => handleChangePost("content", content)}
//       />
//     </div>
//     <Input
//       id="post-image-input"
//       type="file"
//       className="size-0 invisible"
//       onChange={handleChangeImage}
//       multiple
//     ></Input>
//     <div>
//       {images && (
//         <ImageSlider
//           height={200}
//           images={Array.from(images).map((image: File) => ({
//             id: image.name,
//             url: URL.createObjectURL(image),
//           }))}
//         ></ImageSlider>
//       )}
//     </div>
//     <div className="flex justify-end text-main-blue-s3 mt-3 items-center">
//       <Button size={"icon"} variant={"ghost"}>
//         <Label htmlFor="post-image-input">
//           <ImageIcon></ImageIcon>
//         </Label>
//       </Button>
//       <Button size={"icon"} variant={"ghost"}>
//         <HouseIcon></HouseIcon>
//       </Button>

//       <Button
//         size={"sm"}
//         className="block ml-auto"
//         onClick={handleSubmitPost}
//         disabled={Object.values(postCreateData).some((value) => !value.trim())}
//       >
//         Đăng bài
//       </Button>
//     </div>
//   </div>
// </div>;
