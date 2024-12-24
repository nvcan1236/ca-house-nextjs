import DecorativeHeading from "@/components/common/decorative-heading"
import MotelAmenityForm from "@/components/motel/create/motel-amenity-form"

const AmenityInfo = () => {
  return (
    <div className="">
      <div className="">
        <div className="flex flex-col">
          <div className=" mb-12 flex-1 max-w-[800px] w-full mx-auto">
            <DecorativeHeading className="!text-2xl text-main-blue-s3 mb-10">
              Thông tin tiện nghi
            </DecorativeHeading>
            <MotelAmenityForm></MotelAmenityForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmenityInfo
