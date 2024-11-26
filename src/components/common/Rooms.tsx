import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { ChatRoom } from "@/utils/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { setCurrentRoom } from "@/stores/slices/chatSlice";

const Rooms = ({ rooms }: { rooms: ChatRoom[] }) => {
  const partner = (room: ChatRoom) =>
    room.member.filter((member) => member != user?.username)[0];
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <>
      {rooms?.map((room) => (
        <li
          className="flex gap-2 text-xs"
          key={room.id}
          onClick={() => {
            dispatch(setCurrentRoom(room));
          }}
        >
          <Avatar className="size-8">
            <AvatarImage />
            <AvatarFallback className="bg-main-blue text-white ">
              {partner(room)[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <b className="line-clamp-1">{partner(room)}</b>
            <p className="line-clamp-1 text-ellipsis">
              Phòng này bao nhiêu vậy ạ
            </p>
          </div>
        </li>
      ))}
    </>
  );
};

export default Rooms;
