"use client"
import { useState } from "react";
import { LayoutGridIcon, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMotelsQuery } from "@/stores/api/motelApi";
import { useAppSelector } from "@/stores/hooks";
import { useSearchParams } from "next/navigation";
import MotelSkeleton from "@/components/list/MotelSkeleton";
import Motel from "@/components/list/Motel";
import Pagination from "@/components/common/Pagination";
import { IMotel } from "@/lib/types";
import Map from "@/components/common/Map";

const MotelList = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const pageParam = useSearchParams();
  const filter = useAppSelector((state) => state.filter);

  const { data, isFetching } = useGetMotelsQuery({
    page: Number(pageParam.get("page")),
    filter,
  });
  const motelList: IMotel[] = data?.result.data;
  return (
    <div className="">
      {showMap ? (
        <div className="fixed inset-0 z-30">
          <Map />
        </div>
      ) : (
        <div>
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-8">
            {isFetching
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <MotelSkeleton key={index} />)
              : motelList?.map((motel) => {
                  motel = {
                    ...motel,
                    images:
                      motel.images.length > 0
                        ? [motel.images[0]]
                        : motel.images,
                  };
                  return <Motel motel={motel} key={motel.id} />;
                })}
          </div>
          <Pagination
            current={data?.result.currentPage || 1}
            max={data?.result.totalPage || 1}
          />
        </div>
      )}

      <Button
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? (
          <>
            <LayoutGridIcon size={20} className="mr-2" /> Xem danh sách
          </>
        ) : (
          <>
            <MapIcon size={20} className="mr-2" /> Xem trên Map
          </>
        )}
      </Button>
    </div>
  );
};

export default MotelList;
