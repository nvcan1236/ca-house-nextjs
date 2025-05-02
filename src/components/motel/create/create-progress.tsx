import React from "react"
import { useCreateMotelStore } from "@/stores/create-motel-store"

import { steps } from "@/lib/predefined-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CustomTooltip from "@/components/common/tooltip"
import Container from "@/components/layout/container"

const CreateProgress = ({
  disableNext,
  onNextClick,
  nextText,
}: {
  disableNext: boolean
  onNextClick?: () => void
  nextText?: string
}) => {
  const { prevStep, setCurrentStep, currentStep, id } = useCreateMotelStore()
  return (
    <div className="  fixed bottom-0 left-0 right-0 bg-background py-4 border-t ">
      <Container className="flex justify-between gap-2 ">
        <div className="relative flex items-center gap-16">
          <div className="absolute w-full h-px bg-main-yellow z-0"></div>
          {steps.map((step, index) => {
            if (index === 0) return null
            return (
              <div
                key={index}
                className="size-10 rounded-full bg-background relative z-10"
              >
                <CustomTooltip label={step.label}>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    disabled={index > 1 && !id}
                    onClick={setCurrentStep.bind(null, index)}
                    className={cn(
                      " size-10 rounded-full border flex justify-center items-center border-main-blue bg-background text-main-blue",
                      {
                        "border-main-blue-s3 border-2 bg-main-blue-t8 text-main-blue-s3":
                          index === currentStep,
                      }
                    )}
                  >
                    {step.icon}
                  </Button>
                </CustomTooltip>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 origin-center">
          <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
            Quay lại
          </Button>
          <Button disabled={disableNext} size={"lg"} onClick={onNextClick}>
            {nextText || "Tiếp tục"}
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default CreateProgress
