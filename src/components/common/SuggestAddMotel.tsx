import { HousePlusIcon } from "lucide-react";
import { Button } from "../ui/button";

const SuggestAddMotel = () => {
  return (
    <div>
      <Button variant={"secondary"}>
        <HousePlusIcon
          size={20}
          className="text-slate-700 mr-2"
        ></HousePlusIcon>
        Đăng phòng của bạn
      </Button>
    </div>
  );
};

export default SuggestAddMotel;
