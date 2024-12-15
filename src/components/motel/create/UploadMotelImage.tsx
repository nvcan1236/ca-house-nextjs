"use client";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateMotelStore } from "@/providers/create-motel-provider";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UploadMotelImage = () => {
  const { prevStep } = useCreateMotelStore((state) => state);
  // const dispatch = useAppDispatch();
  // const id: string | null = useAppSelector((state) => state.createMotel.id);
  // const [uploadImage] = useUploadImageyMotelMutation();
  const [files, setFiles] = useState<FileList | null>();
  const handleUploadImage = async () => {
    // if (!files || files.length < 5) {
    //   toast.error("Vui long upload ít nhất 5 ảnh");
    //   return;
    // }
    // if (id) {
    //   try {
    //     const data = await uploadImage({ motelId: id, images: files }).unwrap();
    //     data.code == 1000 && dispatch(nextStep());
    //   } catch (error) {
    //     toast.error(error.data.message);
    //   }
    // }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="lg:w-[800px] w-full mx-auto ">
          <DecorativeHeading className="!text-2xl text-main-blue-s3">
            Thêm hình ảnh cho căn trọ
          </DecorativeHeading>

          <label
            htmlFor="motel-image-input"
            className=" block mt-10 min-h-[400px]  border-2 border-main-blue-s3 p-2 rounded-lg border-dashed"
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
              {files &&
                Array.from(files).map((file) => (
                  <div key={file.name} className="">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="selected motel images"
                      width={300}
                      height={200}
                      
                    />
                  </div>
                ))}
            </div>
          </label>
          <Input
            id="motel-image-input"
            type="file"
            className="invisible size-0"
            onChange={(e) => setFiles(e.target.files)}
            multiple
          ></Input>
        </div>

        <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
          <Button variant={"outline"} type="button" asChild>
            <label htmlFor="motel-image-input" className="block">
              <UploadIcon></UploadIcon> Chọn ảnh
            </label>
          </Button>
          <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
            Quay lại
          </Button>
          <Button size={"lg"} onClick={handleUploadImage}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadMotelImage;
