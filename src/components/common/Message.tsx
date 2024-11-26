import { ChatMessage } from "@/utils/interfaces";
import { FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ImageSlider from "./ImageSlider";
import { formatCreatedAt } from "@/services/chartService";

const Message: FC<{
  chat: ChatMessage;
  mine?: boolean;
}> = ({ mine = false, chat }) => {
  if (chat.type.toLowerCase() == "image")
    return (
      <>
        <div
          className={`grid gap-1 ${
            chat.content.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }  mt-1  py-2 px-3 rounded-xl shadow-md w-fit max-w-[200px] ${
            mine ? "ml-auto  rounded-br-none " : "rounded-bl-none"
          }`}
        >
          {chat.content.map((image, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <img className="h-[125px] object-cover" src={image} />
              </DialogTrigger>
              <DialogContent>
                <ImageSlider
                  images={chat.content.map((image, i) => ({
                    id: `${chat.id}-${i}`,
                    url: image,
                  }))}
                  height={500}
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {/* <span className="text-[10px] text-slate-600 text-right">{formatCreatedAt(chat.createdAt)}</span> */}
      </>
    );

  return (
    <div>
      <div
        className={` mt-1  py-2 px-3 rounded-xl shadow-md w-fit text-sm max-w-[200px] ${
          mine
            ? "ml-auto bg-main-blue text-white rounded-br-none border-slate-400 border "
            : "text-main-blue  bg-main-blue-t9 rounded-bl-none"
        }`}
      >
        {chat.content[0]}
      </div>
      {/* <p className="text-[10px] text-slate-600 text-right">{formatCreatedAt(chat.createdAt)}</p> */}
    </div>
  );
};

export default Message;
