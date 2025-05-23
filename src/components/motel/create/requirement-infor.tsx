"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCreateRequirement } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { toast } from "sonner"

import { Job, Requirement } from "@/types/motel"
import { definedJobs } from "@/lib/predefined-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import DecorativeHeading from "@/components/common/decorative-heading"

import CreateProgress from "./create-progress"

const RequirementInfo = () => {
  const router = useRouter()
  const { id, detailMotel } = useCreateMotelStore()
  const initReq = detailMotel?.requirement || {
    deposit: 0,
    contractAmount: 0,
    allowPet: false,
    jobs: [],
    other: null,
  }
  const [requirement, setRequirement] = useState<Requirement>(initReq)
  const handleChange = (
    type: keyof Requirement,
    value: number | string | boolean | Job
  ) => {
    if (type == "jobs") {
      const nextJobs = requirement?.jobs.includes(value as Job)
        ? [...requirement.jobs.filter((job) => job !== value)]
        : [...requirement.jobs, value]
      setRequirement({
        ...requirement,
        jobs: nextJobs as Job[],
      })
    } else {
      setRequirement({
        ...requirement,
        [type]: value,
      })
    }
  }
  const { mutateAsync: createRequirement } = useCreateRequirement()
  const handleCreateRequirement = () => {
    if (id)
      createRequirement({ motelId: id, data: requirement })
        .then(() => {
          router.push("/motels/mine")
          toast.success("Tạo trọ thành công")
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
  }
  return (
    <div className="">
      <div className="flex gap-10 items-stretch mb-20">
        <div className="w-1/2 h-[500px] md:block hidden">
          <Image
            src="/house-banner-1.jpg"
            alt=""
            height={500}
            width={500}
            className="size-full object-cover"
          />
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
              <Checkbox
                className="size-6"
                id="pet-allow"
                checked={requirement?.allowPet}
                onCheckedChange={(e) => handleChange("allowPet", e)}
              />
              <Label htmlFor="pet-allow">Cho nuôi thú cưng</Label>
            </div>
            <div>
              <Label>Đối tượng cho thuê</Label>
              <div className="mt-3 ml-4 ">
                {Object.keys(definedJobs).map((job) => (
                  <div className="flex items-center mt-3 gap-3" key={job}>
                    <Checkbox
                      className="size-6"
                      id={job}
                      checked={requirement?.jobs.includes(job as Job)}
                      onCheckedChange={() => handleChange("jobs", job)}
                    />
                    <Label htmlFor={job}>{definedJobs[job as Job]}</Label>
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

      <CreateProgress
        disableNext={!requirement.contractAmount || !requirement.deposit}
        onNextClick={handleCreateRequirement}
        nextText="Hoàn thành"
      />
    </div>
  )
}

export default RequirementInfo
