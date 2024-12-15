import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ByPeriod } from "@/lib/types";
import { FC } from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const StatUserPeriodChart: FC<{ data: ByPeriod[] }> = ({ data }) => {
  const chartConfig = {
    userCount: {
      label: "User",
      color: "#2563eb",
    },
    ownerCount: {
      label: "Owner",
      color: "#60a5fa",
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
        <Bar dataKey="userCount" fill="var(--color-userCount)" radius={4} />
        <Bar dataKey="ownerCount" fill="var(--color-ownerCount)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default StatUserPeriodChart;
