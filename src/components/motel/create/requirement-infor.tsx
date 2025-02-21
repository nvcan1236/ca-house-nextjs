"use client"

import { useState } from "react"
import Image from "next/image"
import { useCreateRequirement } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { toast } from "sonner"

import { Job, Requirement } from "@/types/motel"
import { definedJobs } from "@/lib/predefined-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import DecorativeHeading from "@/components/common/decorative-heading"

const RequirementInfo = () => {
  const { id, prevStep, nextStep } = useCreateMotelStore()
  const [requirement, setRequirement] = useState<Requirement>({
    deposit: 0,
    contractAmount: 0,
    allowPet: false,
    jobs: [],
    other: null,
  })
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
          nextStep()
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
  }
  return (
    <div className="">
      <div className="flex gap-10 items-stretch mb-20">
        <div className="w-1/2 h-[500px] md:block hidden">
          {/* <Skeleton className="size-full"></Skeleton> */}
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
                {definedJobs.map((job) => (
                  <div className="flex items-center mt-3 gap-3" key={job.type}>
                    <Checkbox
                      className="size-6"
                      id={job.type}
                      checked={requirement?.jobs.includes(job.type)}
                      onCheckedChange={() => handleChange("jobs", job.type)}
                    />
                    <Label htmlFor={job.type}>{job.label}</Label>
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
        <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
          Quay lại
        </Button>
        <Button size={"lg"} onClick={handleCreateRequirement}>
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default RequirementInfo
