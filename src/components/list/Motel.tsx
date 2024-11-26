import { IMotel } from "@/utils/interfaces";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import H3 from "../common/H3";
import ImageSlider from "../common/ImageSlider";

const Motel = ({ motel, onClick }: { motel: IMotel; onClick?: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden border rounded-lg shadow-sm bg-background cursor-pointer">
      <ImageSlider
        images={motel.images}
        height={160}
        onClick={() => {
          onClick && onClick();
        }}
      ></ImageSlider>
      <div className="p-3 text-sm">
        <div className="flex gap-2 items-center">
          <p
            className="text-left font-medium flex-1 overflow-ellipsis line-clamp-1 text-slate-600"
            onClick={() => navigate(`/motels/${motel.id}`)}
          >
            {motel?.name}
          </p>
          <Badge
            variant="default"
            className="text-xs bg-main-yellow-t6 text-main-blue hover:bg-main-yellow"
          >
            {motel?.type?.toLowerCase()}
          </Badge>
        </div>
        <H3 className="!text-base">
          {motel.district}, {motel.city}
        </H3>
        <div className="flex gap-2 items-center justify-between mt-3">
          <span>Diện tích: {motel?.area}m2</span>
          <span className="font-semibold text-main-blue text-lg">
            {Number(motel?.price).toLocaleString()}/
            <span className="text-xs">tháng</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Motel;
