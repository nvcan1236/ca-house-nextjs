import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { useGetPostQuery, useUpdatePostMutation } from "@/stores/api/postApi";
import { ReactNode, useState } from "react";

const EditPostDialog: React.FC<{ children: ReactNode; post: IPost }> = ({
  children,
  post,
}) => {
  const [open, setOpen] = useState(false);
  const { data } = useGetPostQuery(post.id, { skip: !open });
  const editPost = data?.result;
  const [content, setContent] = useState(editPost?.content);
  const [updatePost] = useUpdatePostMutation();

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right mt-2">
              Nội dung
            </Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={editPost?.content}
              value={content}
              rows={7}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 h-fit"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_by" className="text-right">
              Người tạo
            </Label>
            <Input
              id="create_by"
              name="create_by"
              value={editPost?.create_by}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_at" className="text-right">
              Ngày tạo
            </Label>
            <Input
              id="create_at"
              name="create_at"
              value={formatDateTime(editPost?.create_at || "")}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Loài bài đăng
            </Label>
            <Input
              id="type"
              name="type"
              value={editPost?.type}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            onClick={() => {
              if (editPost)
                updatePost({ postId: editPost.id, content: content || "" });
            }}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
