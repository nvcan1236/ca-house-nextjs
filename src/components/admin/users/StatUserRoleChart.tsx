import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ByRole } from "@/utils/types";
import { FC } from "react";
import { Label, Pie, PieChart } from "recharts";

const StatUserRoleChart: FC<{ data: ByRole[] }> = ({ data }) => {
  const color = ["#2563ea", "#bedcfe", "#3a86f6"]
  const chartData = data.map((role, index) => ({...role, fill: color[index]}))
  const chartConfig2 = {
    count: {
      label: "Users",
    },
    ADMIN: {
      label: "Admin",
      color: "#2563ea",
    },
    USER: {
      label: "User",
      color: "#bedcfe",
    },
    OWNER: {
      label: "Owner",
      color: "#3a86f6",
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
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="role"
          innerRadius={60}
          strokeWidth={5}
          fill="var(--color-ADMIN)"
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {data
                        .reduce((acc, role) => acc + role.count, 0)
                        .toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Users
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default StatUserRoleChart;
