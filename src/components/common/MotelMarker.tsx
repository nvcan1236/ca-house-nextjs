import { HouseIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Motel from "../list/Motel";
import { IMotel } from "@/utils/interfaces";

const MotelMarker = ({ motel }: { motel: IMotel }) => {
  const motelDefault: IMotel = {
    area: 20,
    availableDate: "2024-09-30",
    createdAt: "",
    id: "aaa",
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1723903818490-6cb447ad1f05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1724004546109-2d68f5873500?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1686162868146-82d2a40e5579?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    name: "Trọ của Cảnh",
    price: 2000000,
    status: "Còn trống",
    type: "Phòng đơn",
    city: "Ho Chi Minh",
    district: "Nha Be",
    latitude: 0,
    longitude: 0,
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="px-3 py-[6px] bg-main-yellow border shadow-md border-foreground rounded-lg flex items-center gap-[6px]">
            <HouseIcon size={18} className="mr-1" />
            <div className=" flex gap-1 items-baseline text-base">
              {motel.price/1000000} tr<span className="text-slate-800 text-sm">/1th</span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <Motel motel={motel.longitude ? motel : motelDefault}></Motel>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MotelMarker;
