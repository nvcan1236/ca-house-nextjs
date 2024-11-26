import DecorativeHeading from "@/components/common/DecorativeHeading";
import MotelRegularForm from "@/components/form/MotelRegularForm";

const RegularInfo = () => {
  return (
    <div className="">
      <div className="flex gap-10 items-start">
        <div className="w-1/2 md:block hidden">
          <img src="/house-banner-1.jpg" alt="" className="size-full object-cover" />
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
