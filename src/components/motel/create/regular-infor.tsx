import DecorativeHeading from "@/components/common/decorative-heading";
import MotelRegularForm from "@/components/motel/create/motel-requirement-form";
import Image from "next/image";

const RegularInfo = () => {
  return (
    <div className="">
      <div className="flex gap-10">
        <div className=" w-1/2 md:block hidden">
          <div className="h-[500px] relative">
            <Image
              src="/house-banner-1.jpg"
              alt=""
              fill
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className=" w-1/2 flex flex-col flex-1">
          <DecorativeHeading className="text-xl mb-5 text-main-blue-s3 mt-10">
            Các thông tin cơ bản
          </DecorativeHeading>
          <div className="text-lg text-slate-600 mb-12 flex-1">
            <MotelRegularForm></MotelRegularForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularInfo;
