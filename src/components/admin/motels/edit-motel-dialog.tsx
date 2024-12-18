import ImageSlider from "@/components/common/image-slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IMotel } from "@/lib/types";
import {
  useApproveMotelMutation,
  useGetMotelQuery,
} from "@/stores/api/motelApi";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setCurrentStep, setId } from "@/stores/slices/createMotelSlice";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const EditMotelDialog: React.FC<{
  children: ReactNode;
  motel: IMotel;
  forPage?: "user" | "admin";
}> = ({ children, motel, forPage = "user" }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const { data } = useGetMotelQuery(motel.id, { skip: !open });
  const editedMotel = data?.result;
  const user = useAppSelector((state) => state.auth.user);
  const [approveMotel] = useApproveMotelMutation();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = e.target;
    // setEditedMotel((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Motel Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="location">Địa chỉ</TabsTrigger>
            <TabsTrigger value="amenity">Tiện nghi</TabsTrigger>
            <TabsTrigger value="prices">Giá cả</TabsTrigger>
            <TabsTrigger value="requirement">Yêu cầu</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[460px] pr-4 ">
            <TabsContent value="general">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedMotel?.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="area" className="text-right">
                    Area
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={editedMotel?.area}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={editedMotel?.price}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="type"
                    name="type"
                    value={editedMotel?.type}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedMotel?.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4 ">
                  <Label htmlFor="description" className="text-right">
                    Images
                  </Label>
                  <div className="col-span-3">
                    <ImageSlider
                      images={editedMotel?.images || []}
                      height={300}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-start gap-4 ">
                  <Label htmlFor="description" className="text-right">
                    Duyệt
                  </Label>
                  <div className="col-span-3">
                    <Checkbox checked={editedMotel?.approved}></Checkbox>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    City
                  </Label>

                  <Input
                    id="description"
                    name="description"
                    value={editedMotel?.location?.city}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    District
                  </Label>

                  <Input
                    id="description"
                    name="description"
                    value={editedMotel?.location?.district}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ward" className="text-right">
                    Ward
                  </Label>
                  <Input
                    id="ward"
                    name="ward"
                    value={editedMotel?.location?.ward}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="street" className="text-right">
                    Street
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    value={editedMotel?.location?.street}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="street" className="text-right">
                    Other
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    value={editedMotel?.location?.other}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coord" className="text-right">
                    Longitude
                  </Label>
                  <Input
                    id="coord"
                    name="coord"
                    value={editedMotel?.location?.longitude || 0}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coord" className="text-right">
                    Latitude
                  </Label>
                  <Input
                    id="coord"
                    name="coord"
                    value={editedMotel?.location?.latitude || 0}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenity">
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="description" className="text-right">
                    Amenity
                  </Label>
                  <Button variant={"secondary"} size={"sm"}>
                    <PlusIcon className="mr-2" /> Thêm tiện nghi
                  </Button>
                </div>
                {editedMotel?.amenities.map((amenity) => (
                  <div className="bg-main-blue-t9 border w-fit p-2 rounded-md text-main-blue-s3 px-4 mt-3 ">
                    (<span className="text-sm">{amenity.type}</span>) -{" "}
                    {amenity.name}{" "}
                    <XIcon className="inline-block cursor-pointer" size={20} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="prices">
              <div className="grid gap-4 py-4">
                {editedMotel?.prices.map((price) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      {price.name}
                    </Label>

                    <Input
                      id="description"
                      name="description"
                      value={price.value || ""}
                      onChange={handleInputChange}
                      className="col-span-2"
                    />
                    <span>/ {price.unit}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirement">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Nuôi thú cưng
                  </Label>
                  <Checkbox
                    checked={editedMotel?.requirement?.allowPet}
                  ></Checkbox>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contractAmount" className="text-right">
                    Hợp đồng
                  </Label>
                  <Input
                    id="contractAmount"
                    name="contractAmount"
                    value={editedMotel?.requirement?.contractAmount}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contractAmount" className="text-right">
                    Cọc trước
                  </Label>
                  <Input
                    id="contractAmount"
                    name="contractAmount"
                    value={editedMotel?.requirement?.deposit}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contractAmount" className="text-right">
                    Đối tượng
                  </Label>
                  <Input
                    id="contractAmount"
                    name="contractAmount"
                    value={editedMotel?.requirement?.jobs.join(", ")}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contractAmount" className="text-right">
                    Khác
                  </Label>
                  <Input
                    id="contractAmount"
                    name="contractAmount"
                    value={editedMotel?.requirement?.other || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end mt-3 gap-4">
          {editedMotel?.ownerId === user?.username && (
            <Button
              onClick={() => {
                if (editedMotel && editedMotel.id)
                  dispatch(setId(editedMotel.id));

                let curr = 0;
                if (!editedMotel?.requirement) curr = 6;
                if (!editedMotel?.prices.length) curr = 5;
                if (!editedMotel?.images) curr = 4;
                if (!editedMotel?.amenities.length) curr = 3;
                if (!editedMotel?.location) curr = 2;

                curr && dispatch(setCurrentStep(curr));
                curr && navigate("/register-motel");
              }}
            >
              Tiếp tục chính sửa
            </Button>
          )}
          {forPage === "admin" && (
            <Button
              onClick={() => {
                approveMotel(editedMotel?.id || "");
                setOpen(false);
              }}
              className={`${
                editedMotel?.status == "NOT_APPROVED" &&
                "bg-green-600 hover:bg-green-700"
              }`}
              variant={"destructive"}
            >
              {`${
                editedMotel && editedMotel.status == "AVAILABLE"
                  ? "Huỷ duyệt"
                  : "Duyệt trọ"
              }`}
            </Button>
          )}
          <Button>Lưu thay đổi</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMotelDialog;
