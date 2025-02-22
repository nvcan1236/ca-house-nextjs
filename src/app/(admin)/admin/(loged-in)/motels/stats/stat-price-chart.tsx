import { FC } from "react"
import { Pie, PieChart } from "recharts"

import { ByPrice } from "@/types/motel"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const StatPriceChart: FC<{ data: ByPrice[] }> = ({ data }) => {
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

  let chartConfig = {
    count: {
      label: "Tổng",
    },
  } satisfies ChartConfig

  data.map((d) => {
    chartConfig = {
      ...chartConfig,
      [d.range]: {
        label: `${d.range * 2}tr - ${(d.range + 1) * 2}tr`,
      },
    }
  })

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] h-full">
      <PieChart>
        <ChartLegend layout="vertical" content={<ChartLegendContent />} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="count" nameKey="range" />
      </PieChart>
    </ChartContainer>
  )
}

export default StatPriceChart
