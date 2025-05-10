import { ReactNode } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import PostCreate from "./post-create"

const PostCreateDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog modal={false} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none" >
        <PostCreate />
      </DialogContent>
    </Dialog>
  )
}

export default PostCreateDialog
