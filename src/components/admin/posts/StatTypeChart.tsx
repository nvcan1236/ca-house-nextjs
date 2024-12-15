import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { postType } from "@/utils/predefinedData";
import { ByPostType } from "@/utils/types";
import { FC } from "react";
import { Pie, PieChart } from "recharts";

const StatTypeChart: FC<{ data: ByPostType[] }> = ({ data }) => {
  const colors = [
    "#2563ea",
    "#60a8fc",
    "#3787f7",
    "#90c7ff",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe",
  ];

  const chartData = data.map((d, i) => ({
    ...d,
    fill: colors[i],
  }));

  const chartConfig2 = {
    [postType.FIND_ROOM]: {
      label: "Tìm phòng",
    },
    [postType.FIND_ROOMMATE]: {
      label: "Tìm người ở ghép",
    },
    [postType.PASS_ROOM]: {
      label: "Pass phòng",
    },
    [postType.REVIEW]: {
      label: "Review",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig2} className="min-h-[200px] h-full">
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
