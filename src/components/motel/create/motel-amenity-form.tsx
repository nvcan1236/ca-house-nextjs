"use client";
import H3 from "../../common/h3";

import { Button } from "../../ui/button";
import { useState } from "react";
import { facilities, furnitures, services } from "@/lib/predefined-data";
import AmenityItem from "./amenity-item";
import { useCreateMotelStore } from "@/stores/create-motel-store";

const MotelAmenityForm = () => {
  // const dispatch = useAppDispatch();
  // const [createAmenity] = useCreateAmenityMotelMutation();
  // const id: string | null = useAppSelector((state) => state.createMotel.id);

  const { nextStep, prevStep } = useCreateMotelStore();

  type Data = {
    services: string[];
    furnitures: string[];
    facilities: string[];
  };

  const [data, setData] = useState<Data>({
    services: [],
    furnitures: [],
    facilities: [],
  });

  const updateData = (type: keyof Data, value: string) => {
    const newData = { ...data };
    if (newData[type].includes(value)) {
      newData[type] = newData[type].filter((i) => i != value);
    } else {
      newData[type].push(value);
    }

    setData(newData);
  };

  // const getStringData = (): Amenity[] => {
  //   const arrData: Amenity[] = [];
  //   data.services.forEach((s) => arrData.push({ name: s, type: "SERVICE" }));
  //   data.furnitures.forEach((f) =>
  //     arrData.push({ name: f, type: "FURNITURE" })
  //   );
  //   data.facilities.forEach((f) => arrData.push({ name: f, type: "FACILITY" }));
  //   return arrData;
  // };

  const handleFetchAmenity = () => {
    // const amenities = getStringData();
    // if (id)
    //   createAmenity({ motelId: id, data: amenities })
    //     .then((data) => {
    //       console.log(data.data);
    nextStep();
    //     })
    //     .catch((error) => {
    //       toast.error(error.response.data.message);
    //     });
  };

  return (
    <div className="flex flex-col gap-8 mb-20">
      <div>
        <H3 className="text-foreground">Các dịch vụ bao gồm</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {services?.map((service) => (
            <AmenityItem
              key={service.value}
              label={service.label}
              isActive={data["services"].includes(service.value)}
              icon={service.icon}
              onClick={() => updateData("services", service.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Nội thất trong phòng</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {furnitures?.map((furniture) => (
            <AmenityItem
              key={furniture.value}
              label={furniture.label}
              isActive={data["furnitures"].includes(furniture.value)}
              icon={furniture.icon}
              onClick={() => updateData("furnitures", furniture.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Các tiện ích xung quanh</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {facilities?.map((facility) => (
            <AmenityItem
              key={facility.value}
              label={facility.label}
              isActive={data["facilities"].includes(facility.value)}
              icon={facility.icon}
              onClick={() => updateData("facilities", facility.value)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
        <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
          Quay lại
        </Button>
        <Button size={"lg"} onClick={handleFetchAmenity}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default MotelAmenityForm;
