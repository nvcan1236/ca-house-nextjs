/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { IMotelDetail } from "@/types/motel"
import { translations } from "@/lib/predefined-data"
import { Label } from "@/components/ui/label"
import DecorativeHeading from "@/components/common/decorative-heading"

const DetailMotelRequirement = ({
  detailMotel,
}: {
  detailMotel: IMotelDetail
}) => {
  return (
    <div>
      <DecorativeHeading>Yêu cầu từ chủ trọ</DecorativeHeading>
      <div className="mt-4 pl-3">
        {/* {detailMotel?.requirement &&
          Object.keys(detailMotel?.requirement).map((req: any) => (
            <p key={req}>
              <Label>{translations[req]}:</Label>{" "}
              <span>{detailMotel?.requirement[req]}</span>
            </p>
          ))} */}
      </div>
    </div>
  )
}

export default DetailMotelRequirement
