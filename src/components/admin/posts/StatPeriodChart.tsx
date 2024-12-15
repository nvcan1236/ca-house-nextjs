import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ByPostPeriod } from "@/utils/types";
import { FC } from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const StatPeriodChart:FC<{data:ByPostPeriod[]}> = ({data}) => {
  const chartConfig = {
    count: {
      label: "Số lượng",
      color: "#2563eb"
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] size-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default StatPeriodChart;