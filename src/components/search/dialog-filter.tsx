import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RotateCcwIcon, SlidersHorizontalIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import H3 from "../common/H3";
import { Label } from "../ui/label";

const DialogFilter = () => {
  // const filter = useAppSelector((state) => state.filter);
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  // const { data } = useGetMotelStatQuery({
  //   startDate: "2024-01-01",
  //   endDate: "2024-12-31",
  // });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <SlidersHorizontalIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 min-w-[800px] ">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Tìm kiếm nhanh hơn với bộ lọc</DialogTitle>
          {/* {filter.applied && (
            <Button
              variant={"secondary"}
              onClick={() => dispatch(refreshFilter())}
            >
              <RotateCcwIcon size={20} className="mr-2" /> Làm mới
            </Button>
          )} */}
        </DialogHeader>
        {/* <ScrollArea className="max-h-[500px] pr-4">
          <div className="flex flex-col gap-6 mt-6">
            <div>
              <H3>Loại phòng</H3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {motelTypes.map((type) => (
                  <div
                    className={`h-24 border text-main-blue-s2 flex flex-col items-center justify-center rounded-md ${
                      filter.roomType === type.value &&
                      "border-main-blue bg-main-blue-t9"
                    }`}
                    key={type.value}
                    onClick={() => dispatch(updateMotelType(type.value))}
                  >
                    {type.icon} <p className="text-sm mt-2">{type.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H3>Khoảng giá</H3>
              <div>
                <div className="h-[200px] mt-2">
                    <StatPriceChart data={data?.result.byPrice || []} />
                  </div>
                <div className="max-w-full mx-auto mt-2 px-4">
                  <PriceRangeSlider
                    min={500000}
                    max={10000000}
                    step={500000}
                    currentMin={filter.minPrice}
                    currentMax={filter.maxPrice}
                    onChange={(min, max) => {
                      dispatch(updatePrice({ min, max }));
                    }}
                  ></PriceRangeSlider>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex-1">
                <H3>Dịch vụ</H3>
                <div className="ml-3 mt-1">
                  {services.map((service) => (
                    <div key={service.value}>
                      <Checkbox
                        checked={filter.amenities.includes(service.value)}
                        onCheckedChange={() =>
                          dispatch(updateAmenity(service.value))
                        }
                        id={service.value}
                      />{" "}
                      <Label htmlFor={service.value}>{service.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <H3>Nội thất</H3>
                <div className="ml-3 mt-1">
                  {furnitures.map((fur) => (
                    <div key={fur.value}>
                      <Checkbox
                        checked={filter.amenities.includes(fur.value)}
                        onCheckedChange={() =>
                          dispatch(updateAmenity(fur.value))
                        }
                        id={fur.value}
                      />{" "}
                      <Label htmlFor={fur.value}>{fur.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <H3>Tiện ích xung quanh</H3>
                <div className="ml-3 mt-1">
                  {facilities.map((fac) => (
                    <div key={fac.value}>
                      <Checkbox
                        checked={filter.amenities.includes(fac.value)}
                        onCheckedChange={() =>
                          dispatch(updateAmenity(fac.value))
                        }
                        id={fac.value}
                      />{" "}
                      <Label htmlFor={fac.value}>{fac.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Button
                className="block ml-auto mt-6 px-10"
                onClick={() => {
                  dispatch(applyFilter(true));
                  setOpen(false);
                }}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilter;
