import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ByType } from "@/utils/types";
import { FC } from "react";
import { Pie, PieChart } from "recharts";

const StatTypeChart: FC<{ data: ByType[] }> = ({ data }) => {
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
  } satisfies ChartConfig;

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
  );
};

export default StatTypeChart;
