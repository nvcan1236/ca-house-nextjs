import H3 from "../common/H3";

import { Button } from "../ui/button";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { facilities, furnitures, services } from "@/utils/predefinedData";
import { Amenity } from "@/utils/types";
import { useCreateAmenityMotelMutation } from "@/stores/api/motelUtilApi";

const MotelAmenityForm = () => {
  const dispatch = useAppDispatch();
  const [createAmenity] = useCreateAmenityMotelMutation();
  const id: string | null = useAppSelector((state) => state.createMotel.id);
  console.log(id);

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
  const getStringData = (): Amenity[] => {
    const arrData: Amenity[] = [];
    data.services.forEach((s) => arrData.push({ name: s, type: "SERVICE" }));
    data.furnitures.forEach((f) =>
      arrData.push({ name: f, type: "FURNITURE" })
    );
    data.facilities.forEach((f) => arrData.push({ name: f, type: "FACILITY" }));
    return arrData;
  };

  const handleFetchAmenity = () => {
    const amenities = getStringData();
    console.log(getStringData());
    id &&
      createAmenity({ motelId: id, data: amenities })
        .then((data) => {
          console.log(data.data);
          dispatch(nextStep());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <H3 className="text-foreground">Các dịch vụ bao gồm</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {services?.map((service) => (
            <div
              key={service.value}
              className={`rounded-lg border px-6 py-4 text-center bg-background ${
                data["services"].includes(service.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("services", service.value)}
            >
              <div className="w-fit mx-auto my-2">{service.icon}</div>
              <span>{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Nội thất trong phòng</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {furnitures?.map((furniture) => (
            <div
              key={furniture.value}
              className={`rounded-lg border px-6 py-4 text-center bg-background ${
                data["furnitures"].includes(furniture.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("furnitures", furniture.value)}
            >
              <div className="w-fit mx-auto my-2">{furniture.icon}</div>
              <span>{furniture.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <H3 className="text-foreground">Các tiện ích xung quanh</H3>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {facilities?.map((facility) => (
            <div
              key={facility.value}
              className={`rounded-lg border px-6 py-4 text-center bg-background ${
                data["facilities"].includes(facility.value) &&
                "border-main-blue-s3 border-2"
              }`}
              onClick={() => updateData("facilities", facility.value)}
            >
              <div className="w-fit mx-auto my-2">{facility.icon}</div>
              <span>{facility.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
        <Button
          size={"lg"}
          variant={"secondary"}
          onClick={() => dispatch(prevStep())}
        >
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
