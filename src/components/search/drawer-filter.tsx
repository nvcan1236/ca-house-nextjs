import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { SlidersHorizontalIcon } from "lucide-react";

const DrawerFilter = () => {
  // const filter = useAppSelector((state) => state.filter);
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  // const { data } = useGetMotelStatQuery({
  //   startDate: "2024-01-01",
  //   endDate: "2024-12-31",
  // });
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <SlidersHorizontalIcon className="size-6" />
        </Button>
      </DrawerTrigger>
      {/* <DrawerContent>
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Tìm kiếm nhanh hơn với bộ lọc</DrawerTitle>
          {filter.applied && (
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => dispatch(refreshFilter())}
            >
              <RotateCcwIcon size={20} />
            </Button>
          )}
        </DrawerHeader>

        <div className="max-h-[460px] overflow-y-scroll p-6">
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
                    {type.icon}{" "}
                    <p className="text-sm mt-2 text-center">{type.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H3>Khoảng giá</H3>
              <div>
                <div className="h-[200px] mt-2">
                  <StatPriceChart data={data?.result.byPrice || []}  />
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

            <div className="flex gap-2">
              <div className="flex-1">
                <H3>Dịch vụ</H3>
                <div className=" mt-1">
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
                <div className=" mt-1">
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
                <H3>Tiện ích</H3>
                <div className=" mt-1">
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
          </div>
        </div>

        <DrawerFooter className="pt-6">
          <div className="flex gap-3 ">
            <DrawerClose asChild className="w-1/2">
              <Button variant="secondary">Huỷ</Button>
            </DrawerClose>
            <Button
              className="w-1/2"
              onClick={() => {
                dispatch(applyFilter(true));
                setOpen(false);
              }}
            >
              Áp dụng
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent> */}
    </Drawer>
  );
};

export default DrawerFilter;
