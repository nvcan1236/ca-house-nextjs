import { FC } from "react"
import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ByArea } from "@/types/motel"

const StatAreaChart: FC<{ data: ByArea[] }> = ({ data }) => {
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

  let chartConfig = {} satisfies ChartConfig

  data.map((d) => {
    chartConfig = {
      ...chartConfig,
      [d.range]: {
        label: `${d.range * 5}m2 - ${(d.range + 1) * 5}m2`,
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

export default StatAreaChart
