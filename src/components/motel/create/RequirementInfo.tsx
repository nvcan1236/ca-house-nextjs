import DecorativeHeading from "@/components/common/DecorativeHeading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRequirementMotelMutation } from "@/stores/api/motelUtilApi";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { nextStep, prevStep } from "@/stores/slices/createMotelSlice";
import { definedJobs } from "@/utils/predefinedData";
import { Requirement } from "@/utils/types";
import { useState } from "react";
import { toast } from "sonner";

const RequirementInfo = () => {
  const dispatch = useAppDispatch();
  const id: string | null = useAppSelector((state) => state.createMotel.id);

  const [requirement, setRequirement] = useState<Requirement>({
    deposit: 0,
    contractAmount: 0,
    allowPet: false,
    jobs: [],
    other: null,
  });
  const handleChange = (
    type: keyof Requirement,
    value: number | string | boolean
  ) => {
    console.log(type, value);

    if (type == "jobs") {
      const nextJobs = requirement?.jobs.includes(value)
        ? [...requirement.jobs.filter((job) => job !== value)]
        : [...requirement.jobs, value];

      setRequirement({
        ...requirement,
        jobs: nextJobs,
      });
    } else {
      setRequirement({
        ...requirement,
        [type]: value,
      });
    }
  };
  const [createRequirement] = useCreateRequirementMotelMutation();
  const handleCreateRequirement = () => {
    id &&
      createRequirement({ motelId: id, data: requirement })
        .then((data) => {
          console.log(data.data);
          dispatch(nextStep());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  };
  return (
    <div className="">
      <div className="flex gap-10 items-stretch">
        <div className="w-1/2 h-[500px] md:block hidden">
          {/* <Skeleton className="size-full"></Skeleton> */}
          <img src="/house-banner-1.jpg" alt="" className="size-full object-cover" />
        </div>
        <div className=" w-1/2 flex flex-col flex-1">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Các yêu cầu khi thuê
          </DecorativeHeading>
          <div className="mb-12 flex-1 flex flex-col gap-6">
            <div>
              <Label>Yêu cầu cọc</Label>
              <Input
                type="number"
                value={requirement?.deposit}
                onChange={(e) => handleChange("deposit", e.target.value)}
              ></Input>
            </div>
            <div>
              <Label>Hợp đồng (tháng)</Label>
              <Input
                type="number"
                value={requirement?.contractAmount}
                onChange={(e) => handleChange("contractAmount", e.target.value)}
              ></Input>
            </div>
            <div className="flex items-center gap-4">
              <Label>Cho nuôi thú cưng</Label>
              <Checkbox
                className="size-6"
                id="terms"
                checked={requirement?.allowPet}
                onCheckedChange={(e) => handleChange("allowPet", e)}
              />
            </div>
            <div>
              <Label>Đối tượng cho thuê</Label>
              <div className="mt-3 ml-4 ">
                {definedJobs.map((job) => (
                  <div className="flex items-center mt-3 gap-3" key={job.type}>
                    <Checkbox
                      className="size-6"
                      id="terms"
                      checked={requirement?.jobs.includes(job.type)}
                      onCheckedChange={() => handleChange("jobs", job.type)}
                    />
                    <Label>{job.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Yêu cầu khác</Label>
              <Textarea
                value={requirement?.other || ""}
                onChange={(e) => handleChange("other", e.target.value)}
              ></Textarea>
            </div>
          </div>
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
        <Button size={"lg"} onClick={handleCreateRequirement}>
          Hoàn thành
        </Button>
      </div>
    </div>
  );
};

export default RequirementInfo;
