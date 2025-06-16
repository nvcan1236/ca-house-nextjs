/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"
import Image from "next/image"
import {
  useCreateRegularMotel,
  useUpdateRegularMotel,
} from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { RegularCreate } from "@/types/motel"
import { motelTypes } from "@/lib/predefined-data"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import DecorativeHeading from "@/components/common/decorative-heading"

import DatePicker from "../../common/date-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import CreateProgress from "./create-progress"

const formFields: {
  label?: string
  desc?: string
  name: any
  controlInput: (field: any) => ReactNode
}[] = [
  {
    name: "name",
    label: "Đặt tên cho căn trọ",
    desc: "Tên phòng giúp mọi người dễ nhớ đến phòng của bạn hơn",
    controlInput: (field) => <Input {...field} />,
  },
  {
    name: "description",
    label: "Thêm mô tả",
    desc: "Mô tả kỹ hơn về căn trọ của bạn, về những thứ bạn ấn tượng",
    controlInput: (field) => <Textarea {...field} placeholder="Mô tả..." />,
  },
  {
    name: "price",
    label: "Bạn sẽ cho thuê với giá bao nhiêu 1 tháng",
    controlInput: (field) => <Input {...field} type="number" />,
  },
  {
    name: "area",
    label: "Diện tích",
    controlInput: (field) => <Input {...field} type="number" />,
  },
  {
    name: "availableDate",
    label: "Ngày phòng trống",
    controlInput: (field) => (
      <div>
        <DatePicker field={field} />
      </div>
    ),
  },
]
const RegularInfo = () => {
  const { nextStep, setId, detailMotel } = useCreateMotelStore()
  const { mutateAsync: createRegular } = useCreateRegularMotel()
  const { mutateAsync: updateRegular } = useUpdateRegularMotel()

  const loginValidationSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    price: z.coerce.number(),
    type: z.string(),
    area: z.coerce.number(),
    availableDate: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
          const date = new Date(arg)
          return date.toISOString()
        }
        return arg
      },
      z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
    ),
  })

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: detailMotel?.name || "",
      description: detailMotel?.description || "",
      price: detailMotel?.price || 0,
      type: detailMotel?.type || "",
      area: detailMotel?.area || 0,
      availableDate: new Date().toISOString(),
    },
  })

  async function onSubmit(values: RegularCreate) {
    try {
      if (detailMotel?.id) {
        await updateRegular({ motelId: detailMotel.id, data: values })
      } else {
        const data = await createRegular(values)
        setId(data.result.id)
      }
      nextStep()
    } catch (error) {
      toast.error("Đã xãy ra lỗi. Vui lòng thử lại")
      console.log(error)
    }
  }
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="pb-12 gap-4 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại phòng</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {motelTypes?.map((type) => (
                              <div className="h-full" key={type.value}>
                                <RadioGroupItem
                                  value={type.value}
                                  id={type.label}
                                  className="invisible size-0 hidden"
                                />
                                <Label htmlFor={type.label}>
                                  <div
                                    className={cn(
                                      "size-full rounded-lg border-2 p-4 text-center",
                                      {
                                        "border-main-blue-s3 ":
                                          form.getValues("type") === type.value,
                                      }
                                    )}
                                  >
                                    <div className="w-fit mx-auto py-1">
                                      {type.icon}
                                    </div>
                                    <p className="text-xs text-center mt-2 line-clamp-2">
                                      {type.label}
                                    </p>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {formFields.map(
                  ({ name, label, desc, controlInput }, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          {label && <FormLabel>{label}</FormLabel>}
                          {desc && <FormDescription>{desc}</FormDescription>}
                          <FormControl>{controlInput(field)}</FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}

                <CreateProgress
                  disableNext={!form.formState.isValid}
                  onNextClick={() => form.handleSubmit(onSubmit)}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegularInfo
