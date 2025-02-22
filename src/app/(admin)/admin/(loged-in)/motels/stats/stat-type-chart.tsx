import { FC } from "react"
import { Pie, PieChart } from "recharts"

import { ByType } from "@/types/motel"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const StatTypeChart: FC<{ data: ByType[] }> = ({ data }) => {
  const colors = [
    "#2563ea",
    "#3787f7",
    "#60a5fa",
    "#60a8fc",
    "#90c7ff",
    "#93c5fd",
    "#bfdbfe",
  ]

  const chartData = data.map((d, i) => ({
    ...d,
    fill: colors[i],
  }))

  const chartConfig = {
    count: {
      label: "Tổng",
    },
    SINGLE_ROOM: {
      label: "Phòng đơn",
    },
    WHOLE_HOUSE: {
      label: "Nhà nguyên căn",
    },
    APARTMENT: {
      label: "Căn hộ chung cư",
    },
    DORMITORY: {
      label: "Ký túc xá",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] h-full">
      <PieChart>
        <ChartLegend content={<ChartLegendContent />} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="count" nameKey="type" />
      </PieChart>
    </ChartContainer>
  )
}

export default StatTypeChart
