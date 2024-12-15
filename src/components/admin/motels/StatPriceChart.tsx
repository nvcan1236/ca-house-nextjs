import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ByPrice } from "@/utils/types";
import { FC } from "react";
import { Pie, PieChart } from "recharts";

const StatPriceChart: FC<{ data: ByPrice[] }> = ({ data }) => {
  const colors = [
    "#1e3a8a",
    "#075985",
    "#1e40af",
    "#1d4ed8",
    "#0284c7",
    "#2563eb",
    "#3b82f6",
    "#0ea5e9",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe",
  ];

  const chartData = data.map((d, i) => ({
    ...d,
    fill: colors[i],
  }));

  let chartConfig = {
    count: {
      label: "Tổng",
    },
  } satisfies ChartConfig;

  data.map((d) => {
    chartConfig = {
      ...chartConfig,
      [d.range]: {
        label: `${d.range * 2}tr - ${(d.range + 1) * 2}tr`,
      },
    };
  });

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] h-full">
      <PieChart>
        <ChartLegend
          layout="vertical"
          content={<ChartLegendContent  />}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="count" nameKey="range" />
      </PieChart>
    </ChartContainer>
  );
};

export default StatPriceChart;
